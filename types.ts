export enum IssueType {
  BUG = 'Bug',
  FEATURE = 'Feature',
  REFACTOR = 'Refactor',
  DOCS = 'Documentation',
  SECURITY = 'Security',
  PERFORMANCE = 'Performance',
  ACCESSIBILITY = 'Accessibility',
  TEST = 'Testing',
  CHORE = 'Chore',
  DESIGN = 'Design'
}

export interface IssueSuggestion {
  title: string;
  body: string;
  type: IssueType;
  reasoning: string;
}

export interface RepoInfo {
  owner: string;
  name: string;
  url: string;
}

export interface GenerateState {
  isLoading: boolean;
  error: string | null;
  data: IssueSuggestion[] | null;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  repoInfo: RepoInfo;
  suggestions: IssueSuggestion[];
  goals?: string;
}