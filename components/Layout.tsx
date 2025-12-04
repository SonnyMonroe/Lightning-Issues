import React, { useState, useEffect } from 'react';
import { Github, Zap, Sun, Moon, Twitter, Linkedin, Youtube, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

// Custom Icon for Nostr since it's not in Lucide
const NostrIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
     {/* Ostrich-like icon representation for Nostr */}
    <path d="M12 2C8 2 6 6 6 6l-2 4s-1 2 1 2 4 0 4 0v10h2v-8h2v8h2v-8c1-1 2-3 2-6 0 0-2-6-5-6Z" />
    <path d="M15 6h.01" />
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [imageError, setImageError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Using absolute path assuming the folder is in 'public/images/'
  const logoSrc = '/images/logo.png';

  return (
    <div className="flex flex-col min-h-screen bg-github-dark text-github-text font-sans selection:bg-github-accent selection:text-white transition-colors duration-300">
      <header className="border-b border-github-border bg-github-card/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <div className="flex-shrink-0">
              {!imageError ? (
                <img 
                  src={logoSrc}
                  alt="Lightning Bounties" 
                  className="h-6 sm:h-8 w-auto object-contain max-h-10"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="font-bold text-base sm:text-lg tracking-tight text-github-text flex items-center gap-1">
                   <Zap className="text-github-accent fill-current" size={20} />
                   <span className="hidden sm:inline">Lightning Bounties</span>
                </span>
              )}
            </div>
            
            <div className="h-4 w-px bg-github-border mx-1 hidden xs:block"></div>

            <h1 className="font-bold text-sm sm:text-lg tracking-tight text-github-text truncate">
              GitHub Issue Creator
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 text-sm text-github-secondary">
             <a href="https://docs.lightningbounties.com/docs" className="hover:text-github-accent transition-colors">Documentation</a>
             <a href="https://discord.com/invite/zBxj4x4Cbq" className="hover:text-github-accent transition-colors">Support</a>
             <button 
               onClick={toggleTheme}
               className="p-2 hover:bg-github-border rounded-full transition-colors text-github-text"
               title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-1 sm:gap-2">
             <button 
               onClick={toggleTheme}
               className="p-2 hover:bg-github-border rounded-full transition-colors text-github-text"
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button
               onClick={toggleMobileMenu}
               className="p-2 hover:bg-github-border rounded-full transition-colors text-github-text"
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-github-border bg-github-card px-4 py-4 space-y-4 animate-in slide-in-from-top-2 shadow-xl">
             <a href="https://docs.lightningbounties.com/docs" className="block text-github-text font-medium hover:text-github-accent py-2">Documentation</a>
             <a href="https://discord.com/invite/zBxj4x4Cbq" className="block text-github-text font-medium hover:text-github-accent py-2">Support</a>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-github-border bg-github-card pt-6 pb-6 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4">
            {/* Top Brand Section - Full width on mobile to avoid squishing */}
            <div className="mb-6 md:mb-8">
                <div className="mb-4">
                  {!imageError ? (
                    <img 
                        src={logoSrc}
                        alt="Lightning Bounties" 
                        className="h-8 w-auto object-contain max-h-12"
                        onError={() => setImageError(true)}
                    />
                  ) : (
                     <span className="font-bold text-lg tracking-tight text-github-text flex items-center gap-1">
                        <Zap className="text-github-accent fill-current" size={20} />
                        Lightning Bounties
                     </span>
                  )}
                </div>
                <p className="text-sm text-github-secondary leading-relaxed max-w-md">
                    Empowering developers to maintain healthier open source repositories with AI-driven insights and automated workflows.
                </p>
            </div>

            {/* 3 Column Links Grid - Optimized for Mobile */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                
                {/* Explore */}
                <div>
                    <h3 className="font-semibold text-github-text mb-4 text-sm md:text-base">Explore</h3>
                    <ul className="space-y-3 text-xs md:text-sm text-github-secondary">
                        <li><a href="#" className="hover:text-github-accent transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-github-accent transition-colors">About</a></li>
                        <li><a href="https://blog.lightningbounties.com/" className="hover:text-github-accent transition-colors">Blog</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-github-text mb-4 text-sm md:text-base">Resources</h3>
                    <ul className="space-y-3 text-xs md:text-sm text-github-secondary">
                        <li><a href="https://docs.lightningbounties.com/docs" className="hover:text-github-accent transition-colors">Docs</a></li>
                        <li><a href="#" className="hover:text-github-accent transition-colors">FAQ</a></li>
                        <li><a href="https://discord.gg/zBxj4x4Cbq" className="hover:text-github-accent transition-colors">Support</a></li>
                    </ul>
                </div>

                {/* Community / Connect */}
                <div>
                    <h3 className="font-semibold text-github-text mb-4 text-sm md:text-base">Connect</h3>
                    <div className="flex flex-col gap-3">
                         <div className="flex gap-4 text-github-secondary">
                            <a href="https://x.com/LBounties" className="hover:text-github-accent transition-colors" title="Twitter"><Twitter size={18} /></a>
                            <a href="https://www.linkedin.com/company/lightning-bounties/" className="hover:text-github-accent transition-colors" title="LinkedIn"><Linkedin size={18} /></a>
                         </div>
                         <div className="flex gap-4 text-github-secondary">
                            <a href="#" className="hover:text-github-accent transition-colors" title="GitHub"><Github size={18} /></a>
                            <a href="#" className="hover:text-[#8e44ad] transition-colors" title="Nostr"><NostrIcon size={18} /></a>
                            <a href="#" className="hover:text-red-500 transition-colors" title="YouTube"><Youtube size={18} /></a>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-github-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-xs text-github-secondary">
                    © 2025 GitHub Issue Creator. Powered by Lightning Bounties.
                </p>
                <div className="flex gap-6 text-xs text-github-secondary">
                    {/* Empty div for layout balance or future legal links */}
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
