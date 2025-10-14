import type { Bookmark, CreateBookmarkPayload } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/bookmarks";

// TODO: implement API calls
export async function fetchBookmarks(): Promise<Bookmark[]> {
  // TODO: fetch from backend
  const response = await fetch(API_URL);
  const json = await response.json();
  return json.data;
}

export async function addBookmark(payload: CreateBookmarkPayload): Promise<Bookmark> {
  // TODO: POST new bookmark
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
  const json = await res.json();
  return json.data;
}

export async function deleteBookmark(id: string): Promise<void> {
  // TODO: DELETE bookmark by id
  await fetch(`${API_URL}/${id}`, {method: "DELETE"});
}
