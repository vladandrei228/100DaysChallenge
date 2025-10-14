import type { Bookmark } from "../types";

interface Props { bookmarks: Bookmark[]; onDelete: (id:string)=>void; searchTerm:string }

export default function BookmarkList({ bookmarks, onDelete, searchTerm }: Props) {
  // TODO: filter bookmarks by searchTerm
  const searchTerms = searchTerm
  .toLowerCase()
  .split(" ")
  .filter(t => t.trim() !== ""); // split by spaces and remove empty strings

const filtered = bookmarks.filter(b => 
  searchTerms.every(term =>
    b.title.toLowerCase().includes(term) || 
    b.tags.some(tag => tag.toLowerCase().includes(term))
  )
);

  return (
    <div className="mt-4 grid gap-3">
      {filtered.map(b => (
        <div key={b.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <a href={b.url} target="_blank" className="font-semibold text-blue-600 hover:underline">{b.title}</a>
            <div className="text-sm text-gray-500">{b.tags.join(", ")}</div>
          </div>
          <button onClick={()=>onDelete(b.id)} className="text-red-500 hover:text-red-700">✕</button>
        </div>
      ))}
    </div>
  );
}
