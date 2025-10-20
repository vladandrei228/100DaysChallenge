export default function Results({ results, fromCache }) {
  if (!results || results.length === 0) {
    return <div className="text-gray-500 mt-3">No results</div>;
  }

  return (
    <div className="mt-4">
      <div className={`text-sm mb-2 ${fromCache ? "text-green-600" : "text-indigo-500"}`}>
        {fromCache ? "From cache" : "From network"}
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {results.map((r, i) => (
          <li key={i} className="text-gray-800">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
