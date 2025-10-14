interface Props { searchTerm: string; onChange: (value:string)=>void }

export default function SearchBar({ searchTerm, onChange }: Props) {
  return <input type="text" placeholder="Search bookmarks..." value={searchTerm} onChange={e=>onChange(e.target.value)} className="border p-2 w-full rounded-md shadow-sm"/>
}
