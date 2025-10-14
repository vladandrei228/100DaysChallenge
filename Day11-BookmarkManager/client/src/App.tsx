import { useEffect, useState } from "react";
import AddBookmarkForm from "./components/AddBookmarkForm";
import BookmarkList from "./components/BookmarkList";
import SearchBar from "./components/SearchBar";
import { fetchBookmarks, addBookmark, deleteBookmark } from "./lib/api";
import type { Bookmark, CreateBookmarkPayload } from "./types";

export default function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
  const fetchBookmarksAndSetState = async () => {
    const bookmarks = await fetchBookmarks();
    setBookmarks(bookmarks);
  };

  fetchBookmarksAndSetState();
}, []);

  async function handleAdd(payload: CreateBookmarkPayload) {
    // TODO: add bookmark and update state
    try{
      const newBookmark = await addBookmark(payload);
      setBookmarks(prev => [...prev, newBookmark]);
    }catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    // TODO: delete bookmark and update state
    try{
      await deleteBookmark(id);
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
    }catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">🔖 Bookmark Manager</h1>
      <AddBookmarkForm onAdd={handleAdd}/>
      <div className="mt-6">
        <SearchBar searchTerm={searchTerm} onChange={setSearchTerm}/>
        <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} searchTerm={searchTerm}/>
      </div>
    </div>
  );
}
