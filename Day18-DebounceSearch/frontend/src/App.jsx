import { useState } from "react";
import Results from "./components/Results";
import useDebouncedSearch from "./hooks/useDebounceSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const { results, loading, error, fromCache } = useDebouncedSearch(query);

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">🎯 Movie Search (Day 18)</h1>

      <input
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <div className="mt-4">
        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
            <span>Loading…</span>
          </div>
        )}
        {error && <div className="text-red-600">Error: {String(error)}</div>}
        <Results results={results} fromCache={fromCache} />
      </div>
    </div>
  );
}
