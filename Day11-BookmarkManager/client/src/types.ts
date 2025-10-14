export interface Bookmark {
  id: string;
  title: string;
  url: string;
  tags: string[];
  created_at: string;
}

export interface CreateBookmarkPayload {
  title: string;
  url: string;
  tags?: string[];
}
