import React from 'react';
import { Github, Zap, Heart, Code, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-github-text mb-6 tracking-tight">
          Building the Future of <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-github-accent to-purple-500">Open Source Funding</span>
        </h2>
        <p className="text-github-secondary text-xl max-w-2xl mx-auto leading-relaxed">
          Lightning Issues was born from a simple idea: <strong>Great contributions start with great communication.</strong>
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-github-card border border-github-border rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={100} />
            </div>
            <h3 className="text-2xl font-bold text-github-text mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" /> The Mission
            </h3>
            <p className="text-github-secondary leading-relaxed">
                We believe that open source developers deserve to be paid for their work. Lightning Bounties provides the infrastructure for instant, low-fee payments using Bitcoin. 
                <br/><br/>
                However, we realized that many repositories struggle to define clear, actionable tasks. <strong>Lightning Issues</strong> bridges that gap by using AI to structure chaos into clear, bounty-ready issues.
            </p>
        </div>

        <div className="bg-github-card border border-github-border rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users size={100} />
            </div>
            <h3 className="text-2xl font-bold text-github-text mb-4 flex items-center gap-2">
                <Users className="text-blue-400" /> For The Community
            </h3>
            <p className="text-github-secondary leading-relaxed">
                Whether you are a solo maintainer overwhelmed by technical debt, or a new contributor looking for your first issue, this tool is designed for you.
                <br/><br/>
                We are fully open source and community-driven. We don't track your data, we don't store your private code, and we are committed to building tools that empower the developer ecosystem.
            </p>
        </div>
      </div>

      {/* Stats / Info */}
      <div className="border-t border-b border-github-border py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
                <div className="text-4xl font-bold text-github-text mb-2">100%</div>
                <div className="text-github-secondary uppercase text-sm tracking-wider font-semibold">Open Source</div>
            </div>
            <div>
                <div className="text-4xl font-bold text-github-text mb-2">AI</div>
                <div className="text-github-secondary uppercase text-sm tracking-wider font-semibold">Powered by Gemini</div>
            </div>
            <div>
                <div className="text-4xl font-bold text-github-text mb-2">0</div>
                <div className="text-github-secondary uppercase text-sm tracking-wider font-semibold">Trackers</div>
            </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center">
        <p className="text-github-secondary mb-6">Want to get involved?</p>
        <div className="flex justify-center gap-4">
             <a 
                href="https://github.com/SonnyMonroe/Lightning-Issues" 
                target="_blank" 
                className="flex items-center gap-2 bg-github-card border border-github-border hover:border-github-accent px-6 py-3 rounded-lg font-semibold text-github-text transition-colors"
             >
                <Github size={20} />
                Star on GitHub
             </a>
             <a 
                href="https://lightningbounties.com" 
                target="_blank" 
                className="flex items-center gap-2 bg-github-primary hover:bg-github-primaryHover px-6 py-3 rounded-lg font-semibold text-white transition-colors"
             >
                <Heart size={20} fill="currentColor" />
                Support Us
             </a>
        </div>
      </div>

    </div>
  );
};