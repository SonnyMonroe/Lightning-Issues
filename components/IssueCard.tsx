import React, { useState, useEffect } from 'react';
import { ExternalLink, Copy, Check, ChevronDown, ChevronUp, Bug, Lightbulb, FileText, Hammer, Pencil, X, Save } from 'lucide-react';
import { IssueSuggestion, IssueType, RepoInfo } from '../types';

interface IssueCardProps {
  suggestion: IssueSuggestion;
  repoInfo: RepoInfo | null;
}

export const IssueCard: React.FC<IssueCardProps> = ({ suggestion, repoInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(suggestion.title);
  const [body, setBody] = useState(suggestion.body);

  // Reset state when suggestion prop changes (e.g. re-generation)
  useEffect(() => {
    setTitle(suggestion.title);
    setBody(suggestion.body);
  }, [suggestion]);

  const getIcon = (type: IssueType) => {
    switch (type) {
      case IssueType.BUG: return <Bug size={18} className="text-red-600 dark:text-red-400" />;
      case IssueType.FEATURE: return <Lightbulb size={18} className="text-amber-600 dark:text-yellow-400" />;
      case IssueType.DOCS: return <FileText size={18} className="text-blue-600 dark:text-blue-400" />;
      case IssueType.REFACTOR: return <Hammer size={18} className="text-purple-600 dark:text-purple-400" />;
      default: return <Lightbulb size={18} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getColor = (type: IssueType) => {
    switch (type) {
      case IssueType.BUG: 
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900/30';
      case IssueType.FEATURE: 
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-900/30';
      case IssueType.DOCS: 
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-900/30';
      case IssueType.REFACTOR: 
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-900/30';
      default: 
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateClick = () => {
    if (!repoInfo) return;
    const baseUrl = `https://github.com/${repoInfo.owner}/${repoInfo.name}/issues/new`;
    const params = new URLSearchParams();
    params.set('title', title);
    params.set('body', body);
    
    const labelMap = {
        [IssueType.BUG]: 'bug',
        [IssueType.FEATURE]: 'enhancement',
        [IssueType.DOCS]: 'documentation',
        [IssueType.REFACTOR]: 'refactor'
    };
    params.set('labels', labelMap[suggestion.type]);
    
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const handleEditToggle = () => {
    setIsEditing(true);
    setIsExpanded(true); // Auto-expand when editing
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(suggestion.title);
    setBody(suggestion.body);
    setIsEditing(false);
  };

  return (
    <div className="bg-github-card border border-github-border rounded-xl overflow-hidden hover:border-github-accent/50 hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Header */}
      <div className="p-5 border-b border-github-border">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 w-full">
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold mb-3 border transition-colors ${getColor(suggestion.type)}`}>
              {getIcon(suggestion.type)}
              {suggestion.type}
            </div>
            
            {isEditing ? (
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-xl font-bold border-b-2 border-github-accent focus:outline-none pb-1 mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                autoFocus
              />
            ) : (
              <h3 className="text-xl font-bold text-github-text leading-tight group-hover:text-github-accent transition-colors break-words">
                {title}
              </h3>
            )}
          </div>
        </div>
        {/* Reasoning text - adaptive color */}
        <p className="mt-3 text-sm text-github-secondary leading-relaxed">
            {suggestion.reasoning}
        </p>
      </div>

      {/* Content Preview / Editor */}
      <div className={`relative transition-all duration-300 ${isEditing ? 'bg-github-card' : 'bg-gray-50 dark:bg-[#0d1117]'} ${isExpanded || isEditing ? 'h-auto min-h-[12rem]' : 'h-48'}`}>
        
        {isEditing ? (
           <textarea
             value={body}
             onChange={(e) => setBody(e.target.value)}
             className="w-full h-96 p-5 font-mono text-sm border-y border-github-border resize-y focus:outline-none focus:ring-2 focus:ring-inset focus:ring-github-accent transition-colors bg-white text-gray-900 placeholder-gray-500 dark:bg-[#0d1117] dark:text-gray-100 dark:placeholder-gray-600"
             placeholder="Describe the issue... (Markdown supported)"
             spellCheck={false}
           />
        ) : (
          <>
            <div className="p-5 font-mono text-sm text-gray-900 dark:text-gray-200 whitespace-pre-wrap overflow-hidden h-full">
                {body}
            </div>
            
            {!isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent dark:from-[#0d1117] dark:via-[#0d1117]/50 flex items-end justify-center pb-4">
                </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-github-card border-t border-github-border mt-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
            {isEditing ? (
                <>
                    <button 
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium flex items-center gap-1 transition-colors px-2 py-1"
                        title="Save changes"
                    >
                        <Check size={16} /> Save
                    </button>
                    <button 
                        onClick={handleCancel}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors px-2 py-1"
                        title="Discard changes"
                    >
                        <X size={16} /> Cancel
                    </button>
                </>
            ) : (
                <>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-github-text dark:text-gray-400 dark:hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? (
                            <>Collapse <ChevronUp size={16} /></>
                        ) : (
                            <>View Content <ChevronDown size={16} /></>
                        )}
                    </button>
                    
                    <div className="w-px h-4 bg-github-border mx-1"></div>

                    <button 
                        onClick={handleEditToggle}
                        className="text-gray-500 hover:text-github-accent dark:text-gray-400 dark:hover:text-github-accent text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                        <Pencil size={14} /> Edit
                    </button>
                </>
            )}
        </div>

        <div className="flex items-center gap-2">
            {!isEditing && (
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-500 hover:text-github-text hover:bg-github-border rounded-md transition-all dark:text-gray-400 dark:hover:text-white"
                    title="Copy Markdown"
                >
                    {copied ? <Check size={18} className="text-green-600 dark:text-green-500" /> : <Copy size={18} />}
                </button>
            )}
            <button
                onClick={handleCreateClick}
                disabled={!repoInfo}
                className="flex items-center gap-2 bg-github-primary hover:bg-github-primaryHover text-white px-4 py-2 rounded-md font-semibold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
                Create Issue <ExternalLink size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};