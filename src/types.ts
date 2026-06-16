export interface Section {
  id: string; // anchor id
  title: string;
  content?: string; // search content
}

export interface PageConfig {
  id: string;
  title: string;
  shortTitle: string;
  sections: Section[];
}

export interface SearchResult {
  pageId: string;
  pageTitle: string;
  sectionId: string;
  sectionTitle: string;
  snippet: string;
}

export interface RoleInfo {
  icon: string;
  title: string;
  description: string;
  quickNavigateId: string; // Page ID
  details: string[];
}
