import React from 'react';
import { ScanSearch, FileSignature, Rocket, Shield, Zap, Search, Globe, Code, CircleCheck } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ScanSearch,
      title: "Deep Repo Analysis",
      description: "We don't just skim. Our AI performs a deep dive into your repository's structure, dependencies, and recent commit history to understand the context before suggesting issues.",
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      border: "border-blue-500/30"
    },
    {
      icon: FileSignature,
      title: "Perfect Markdown",
      description: "Forget manual formatting. Issues are generated with professional GitHub Flavored Markdown, including code blocks, checklists, headers, and proper label suggestions.",
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      border: "border-purple-500/30"
    },
    {
      icon: Rocket,
      title: "One-Click Posting",
      description: "Seamless integration with GitHub. With a single click, we open the 'New Issue' interface with all fields pre-filled. No copy-pasting required.",
      color: "text-green-400",
      bg: "bg-green-900/20",
      border: "border-green-500/30"
    },
    {
      icon: Search,
      title: "TODO Scanner",
      description: "Our intelligent scanner hunts through your source code to find `// TODO`, `// FIXME`, and `// HACK` comments, instantly converting technical debt into actionable issues.",
      color: "text-orange-400",
      bg: "bg-orange-900/20",
      border: "border-orange-500/30"
    },
    {
      icon: Globe,
      title: "Search Grounding",
      description: "Powered by Google Search Grounding, the AI has up-to-date knowledge of libraries and frameworks, ensuring suggestions aren't based on outdated documentation.",
      color: "text-pink-400",
      bg: "bg-pink-900/20",
      border: "border-pink-500/30"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built on Google's Gemini 1.5 Flash model, generation takes seconds. Get back to coding faster.",
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
      border: "border-yellow-500/30"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-github-text mb-6">
          Powerful Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-github-accent to-purple-400">Modern Maintainers</span>
        </h2>
        <p className="text-github-secondary text-lg max-w-2xl mx-auto">
          Everything you need to streamline your open source workflow and prepare your repository for Lightning Bounties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={`group p-8 rounded-2xl bg-github-card border ${feature.border} hover:border-github-accent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} rounded-bl-full opacity-50 transition-transform group-hover:scale-110`} />
            
            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 ${feature.color} ring-1 ring-inset ring-white/10`}>
              <feature.icon size={28} strokeWidth={1.5} />
            </div>
            
            <h3 className="text-xl font-bold text-github-text mb-3 group-hover:text-github-accent transition-colors">
              {feature.title}
            </h3>
            <p className="text-github-secondary leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-github-card to-github-dark border border-github-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
            <h3 className="text-2xl font-bold text-github-text mb-2">Ready to optimize your repo?</h3>
            <p className="text-github-secondary">Start generating professional issues in seconds.</p>
        </div>
        <div className="flex items-center gap-2 text-github-accent font-semibold bg-github-accent/10 px-6 py-3 rounded-full">
            <CircleCheck size={20} />
            <span>Free to use</span>
        </div>
      </div>
    </div>
  );
};