import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { RepoInput } from './components/RepoInput';
import { IssueCard } from './components/IssueCard';
import { Features } from './components/pages/Features';
import { About } from './components/pages/About';
import { FAQ } from './components/pages/FAQ';
import { IssueTemplates } from './components/pages/IssueTemplates';
import { generateIssueSuggestions, parseRepoUrl } from './services/geminiService';
import { GenerateState, RepoInfo, HistoryItem, IssueSuggestion } from './types';
import { CircleAlert, ScanSearch, FileSignature, Rocket, History, Sparkles, Trash, ArrowRight, Search, Github, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home'); // home, features, about, faq, templates
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');
  const [state, setState] = useState<GenerateState>({
    isLoading: false,
    error: null,
    data: null,
  });
  const [currentRepo, setCurrentRepo] = useState<RepoInfo | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Simple router simulation to handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') || 'home';
      setCurrentPage(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', path);
  };

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('lightning_issues_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage when it updates
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('lightning_issues_history', JSON.stringify(newHistory));
  };

  const addToHistory = (repoInfo: RepoInfo, suggestions: IssueSuggestion[], goals?: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      repoInfo,
      suggestions,
      goals
    };
    // Add to beginning of list
    const updatedHistory = [newItem, ...history];
    saveHistory(updatedHistory);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your entire history?")) {
      saveHistory([]);
    }
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistory(updatedHistory);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setCurrentRepo(item.repoInfo);
    setState({ isLoading: false, error: null, data: item.suggestions });
    setActiveTab('generate');
  };

  const handleAnalyze = async (url: string, goals: string, scanTodos: boolean) => {
    const repoInfo = parseRepoUrl(url);
    if (!repoInfo) {
      setState(prev => ({ ...prev, error: "Please enter a valid GitHub repository URL." }));
      return;
    }

    setCurrentRepo({ ...repoInfo, url });
    setState({ isLoading: true, error: null, data: null });

    try {
      const suggestions = await generateIssueSuggestions(url, goals, scanTodos);
      setState({ isLoading: false, error: null, data: suggestions });
      addToHistory({ ...repoInfo, url }, suggestions, goals);
    } catch (err: any) {
      setState({ 
        isLoading: false, 
        error: err.message || "Something went wrong while analyzing the repository.", 
        data: null 
      });
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center">
      
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-github-card border border-github-border rounded-lg mb-8">
          <button 
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'generate' ? 'bg-github-accent text-white shadow-md' : 'text-github-secondary hover:text-github-text hover:bg-github-border/50'}`}
          >
              <Sparkles size={16} /> Generator
          </button>
          <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'history' ? 'bg-github-accent text-white shadow-md' : 'text-github-secondary hover:text-github-text hover:bg-github-border/50'}`}
          >
              <History size={16} /> History
          </button>
      </div>

      {activeTab === 'generate' ? (
          <>
              <RepoInput 
              onAnalyze={handleAnalyze} 
              isLoading={state.isLoading} 
              hasData={!!state.data}
              />

              {/* Error State */}
              {state.error && (
              <div className="w-full max-w-2xl p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-3 text-red-200 mb-8 animate-in fade-in slide-in-from-bottom-4">
                  <CircleAlert className="shrink-0 mt-0.5" />
                  <p>{state.error}</p>
              </div>
              )}

              {/* Results List */}
              {state.data && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-github-text">Suggested Issues</h2>
                  {currentRepo && (
                      <a 
                          href={currentRepo.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-github-accent hover:underline text-sm font-medium"
                      >
                          {currentRepo.owner}/{currentRepo.name}
                      </a>
                  )}
                  </div>
                  
                  <div className="flex flex-col gap-6">
                  {state.data.map((suggestion, index) => (
                      <IssueCard 
                          key={index} 
                          suggestion={suggestion} 
                          repoInfo={currentRepo} 
                      />
                  ))}
                  </div>
              </div>
              )}
              
              {/* HOW IT WORKS & FEATURES (Only show when not generated) */}
              {!state.data && !state.isLoading && !state.error && (
                  <div className="w-full max-w-5xl px-4 flex flex-col items-center">
                      
                      {/* HOW IT WORKS SECTION */}
                      <div className="mt-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                          <div className="text-center mb-10">
                              <h3 className="text-2xl md:text-3xl font-bold text-github-text mb-3">
                                  How it Works
                              </h3>
                              <p className="text-github-secondary text-base md:text-lg max-w-2xl mx-auto">
                                  Go from zero to bounty-ready issue in 3 simple steps.
                              </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                              {/* Connector Line (Desktop) */}
                              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-github-border via-github-accent/30 to-github-border -z-10 -translate-y-8"></div>

                              {/* Step 1 */}
                              <div className="group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5 flex flex-col items-center text-center relative">
                                  <div className="w-12 h-12 rounded-full bg-github-page border-2 border-github-accent/50 text-github-accent flex items-center justify-center text-xl font-bold mb-4 shadow-[0_0_15px_-3px_var(--accent-color)] z-10 group-hover:scale-110 transition-transform duration-300">
                                      1
                                  </div>
                                  <h4 className="text-lg font-semibold text-github-text mb-2 group-hover:text-github-accent transition-colors">Paste GitHub Repo URL</h4>
                                  <p className="text-sm text-github-secondary">Simply copy and paste the link to any public GitHub repository you want to analyze.</p>
                              </div>

                              {/* Step 2 */}
                              <div className="group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5 flex flex-col items-center text-center relative">
                                  <div className="w-12 h-12 rounded-full bg-github-page border-2 border-purple-500/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-4 shadow-[0_0_15px_-3px_#a78bfa] z-10 group-hover:scale-110 transition-transform duration-300">
                                      2
                                  </div>
                                  <h4 className="text-lg font-semibold text-github-text mb-2 group-hover:text-purple-400 transition-colors">Add Project Goals (Optional)</h4>
                                  <p className="text-sm text-github-secondary">Provide extra context to help the AI tailor its suggestions to your specific needs.</p>
                              </div>

                              {/* Step 3 */}
                              <div className="group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5 flex flex-col items-center text-center relative">
                                  <div className="w-12 h-12 rounded-full bg-github-page border-2 border-green-500/50 text-green-500 flex items-center justify-center text-xl font-bold mb-4 shadow-[0_0_15px_-3px_#22c55e] z-10 group-hover:scale-110 transition-transform duration-300">
                                      3
                                  </div>
                                  <h4 className="text-lg font-semibold text-github-text mb-2 group-hover:text-green-400 transition-colors">1-Click Post Issue</h4>
                                  <p className="text-sm text-github-secondary">
                                      One-click export to GitHub, ready to post on <a href="https://app.lightningbounties.com/" className="text-github-accent hover:underline font-medium">Lightning Bounties</a>.
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* FEATURES SECTION */}
                      <div className="mt-24 w-full mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                          <div className="text-center mb-10">
                              <h3 className="text-2xl md:text-3xl font-bold text-github-text mb-3">
                                  Why use Lightning Issues?
                              </h3>
                              <p className="text-github-secondary text-base md:text-lg max-w-2xl mx-auto">
                                  Powerful features designed to optimize your open source workflow.
                              </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Feature 1 */}
                              <button onClick={() => navigateTo('features')} className="text-left group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5">
                                  <div className="w-14 h-14 rounded-xl bg-github-dark border border-github-border flex items-center justify-center mx-auto mb-6 text-github-accent group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_-5px_var(--accent-color)]">
                                      <ScanSearch size={28} strokeWidth={1.5} />
                                  </div>
                                  <h3 className="text-lg font-semibold text-github-text mb-3 group-hover:text-github-accent transition-colors text-center">Deep Analysis</h3>
                                  <p className="text-sm text-github-secondary leading-relaxed text-center">
                                      We analyze the repo structure and public info to find relevant gaps using advanced AI grounding.
                                  </p>
                              </button>

                              {/* Feature 2 */}
                              <button onClick={() => navigateTo('features')} className="text-left group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5">
                                  <div className="w-14 h-14 rounded-xl bg-github-dark border border-github-border flex items-center justify-center mx-auto mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_-5px_#a78bfa]">
                                      <FileSignature size={28} strokeWidth={1.5} />
                                  </div>
                                  <h3 className="text-lg font-semibold text-github-text mb-3 group-hover:text-purple-400 transition-colors text-center">Perfect Markdown</h3>
                                  <p className="text-sm text-github-secondary leading-relaxed text-center">
                                      Issues are formatted with clear steps, reproduction guides, and proper headers ready for GitHub.
                                  </p>
                              </button>

                              {/* Feature 3 */}
                              <button onClick={() => navigateTo('features')} className="text-left group p-6 rounded-2xl bg-github-card border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/5">
                                  <div className="w-14 h-14 rounded-xl bg-github-dark border border-github-border flex items-center justify-center mx-auto mb-6 text-green-500 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_-5px_#22c55e]">
                                      <Rocket size={28} strokeWidth={1.5} />
                                  </div>
                                  <h3 className="text-lg font-semibold text-github-text mb-3 group-hover:text-green-400 transition-colors text-center">Instant Posting</h3>
                                  <p className="text-sm text-github-secondary leading-relaxed text-center">
                                      One click opens the GitHub New Issue page with everything pre-filled. No manual copy-pasting.
                                  </p>
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </>
      ) : (
          <div className="w-full max-w-4xl px-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-github-text">Generation History</h2>
                  {history.length > 0 && (
                      <button 
                          onClick={clearHistory}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors border border-transparent hover:border-red-900/30"
                      >
                          <Trash size={14} /> Clear History
                      </button>
                  )}
              </div>

              {history.length === 0 ? (
                  <div className="text-center py-16 bg-github-card border border-github-border rounded-xl">
                      <History className="mx-auto h-12 w-12 text-github-secondary mb-4 opacity-50" />
                      <h3 className="text-lg font-medium text-github-text">No history yet</h3>
                      <p className="text-github-secondary mt-1">Generate some issues to see them here.</p>
                      <button 
                          onClick={() => setActiveTab('generate')}
                          className="mt-6 text-github-accent hover:underline text-sm font-medium"
                      >
                          Go to Generator
                      </button>
                  </div>
              ) : (
                  <div className="space-y-4">
                      {history.map((item) => (
                          <div 
                              key={item.id}
                              onClick={() => loadHistoryItem(item)}
                              className="group bg-github-card border border-github-border rounded-xl p-4 hover:border-github-accent/50 transition-all cursor-pointer relative"
                          >
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-semibold text-github-text group-hover:text-github-accent transition-colors">
                                      {item.repoInfo.owner}/{item.repoInfo.name}
                                  </h3>
                                  <button
                                      onClick={(e) => deleteHistoryItem(item.id, e)}
                                      className="p-2 text-github-secondary hover:text-red-400 hover:bg-github-border/50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                      title="Delete from history"
                                  >
                                      <Trash size={16} />
                                  </button>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-github-secondary mb-3">
                                  <span>{new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}</span>
                                  <span>•</span>
                                  <span>{item.suggestions.length} Issues Generated</span>
                              </div>
                              {item.goals && (
                                  <p className="text-sm text-github-secondary italic truncate max-w-2xl mb-3">
                                      Goal: "{item.goals}"
                                  </p>
                              )}
                              <div className="flex gap-2">
                                  {item.suggestions.slice(0, 3).map((suggestion, idx) => (
                                      <span key={idx} className="inline-block px-2 py-0.5 rounded text-xs bg-github-border/30 text-github-secondary border border-github-border">
                                          {suggestion.type}
                                      </span>
                                  ))}
                              </div>
                              
                              <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-github-accent">
                                  <ArrowRight size={20} />
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      )}
    </div>
  );

  return (
    <Layout onNavigate={navigateTo} currentPage={currentPage}>
      {currentPage === 'home' && renderHome()}
      {currentPage === 'features' && <Features />}
      {currentPage === 'about' && <About />}
      {currentPage === 'faq' && <FAQ />}
      {currentPage === 'templates' && <IssueTemplates />}
    </Layout>
  );
};

export default App;