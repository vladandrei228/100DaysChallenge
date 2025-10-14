import { useState } from "react";
import type { CreateBookmarkPayload } from "../types";

interface Props { onAdd: (bookmark: CreateBookmarkPayload) => void; }

export default function AddBookmarkForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: CreateBookmarkPayload = {
      title, url, tags: tags.split(",").map(t => t.trim()).filter(Boolean)
    };
    // TODO: call onAdd
    onAdd(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-md">
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 rounded-md"/>
      <input type="url" placeholder="URL" value={url} onChange={e=>setUrl(e.target.value)} className="border p-2 rounded-md"/>
      <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e=>setTags(e.target.value)} className="border p-2 rounded-md"/>
      <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Add Bookmark</button>
    </form>
  );
}
