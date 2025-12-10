import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-github-border rounded-xl bg-github-card overflow-hidden transition-all duration-300 hover:border-github-accent/50">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-github-text pr-4">{question}</span>
        <div className={`p-2 rounded-full bg-github-border/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-github-accent' : 'text-github-secondary'}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 text-github-secondary leading-relaxed border-t border-transparent">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the AI analyze my repository?",
      answer: "We use Google's Gemini 1.5 Flash model combined with Search Grounding. This allows the AI to 'read' your public repository structure, README, and documentation indexed by search engines to understand the context without needing direct write access to your code."
    },
    {
      question: "Is this free to use?",
      answer: "Yes! Lightning Issues is currently free for all developers. Our goal is to support the open source ecosystem and help developers get ready for paid bounties on the Lightning Bounties platform."
    },
    {
      question: "Can I use this on private repositories?",
      answer: "Currently, no. Since we rely on public indexing and non-intrusive scanning methods, the repository must be public. Support for private repositories via GitHub App integration is on our roadmap."
    },
    {
      question: "What happens when I click 'Create Issue'?",
      answer: "We generate a special URL that redirects you to GitHub's native 'New Issue' page. All the fields (Title, Body, Labels) are pre-filled via URL parameters. We do not automatically post to your repo, giving you full control to review before submitting."
    },
    {
      question: "How accurate is the TODO scanner?",
      answer: "The TODO scanner uses advanced search operators to find specific comments in your codebase. While highly effective, it relies on search indexing updates. Recently added code (minutes ago) might not appear immediately."
    },
    {
      question: "What is Lightning Bounties?",
      answer: (
        <span>
          Lightning Bounties is a platform where developers can earn Bitcoin (via Lightning Network) for solving GitHub issues. Lightning Issues helps you create high-quality issue descriptions that attract funding and developers.
        </span>
      )
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-github-accent/10 rounded-full text-github-accent mb-4">
            <CircleHelp size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-github-text mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-github-secondary text-lg">
          Got questions? We've got answers.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === idx}
            onClick={() => toggleFAQ(idx)}
          />
        ))}
      </div>
    </div>
  );
};