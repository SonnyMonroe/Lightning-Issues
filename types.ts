export enum IssueType {
  BUG = 'Bug',
  FEATURE = 'Feature',
  REFACTOR = 'Refactor',
  DOCS = 'Documentation'
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