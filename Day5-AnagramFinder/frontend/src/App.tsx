import { useState, useRef, useEffect } from "react";

export default function App() {
  const [word, setWord] = useState("");
  const [limit, setLimit] = useState(200);
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [tookMs, setTookMs] = useState<number | null>(null);

  const debounceRef = useRef<number | null>(null);
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  function validateInput(v: string) {
    const t = v.trim();
    if (t.length < 2) return "Type at least 2 letters";
    if (!/^[a-zA-Z]+$/.test(t)) return "Letters only";
    return null;
  }

  async function fetchAnagrams(query?: string) {
    const w = (query || word).trim().toLowerCase();
    const err = validateInput(w);
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError(null);
    setSource(null);
    setTookMs(null);

    try {
      const start = Date.now();
      const res = await fetch(`http://localhost:3001/api/anagrams?word=${encodeURIComponent(w)}&limit=${limit}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || `Server ${res.status}`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setAnagrams(data.anagrams || []);
      setSource(data.source || null);
      setTookMs(Date.now() - start);
    } catch {
      setError("Failed to contact backend");
    } finally {
      setLoading(false);
    }
  }

  function onChange(v: string) {
    setWord(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (!validateInput(v)) fetchAnagrams(v);
    }, 300);
  }

  function randomTest() {
    const tests = ["listen", "notes", "stone", "panel", "race", "angle"];
    const r = tests[Math.floor(Math.random() * tests.length)];
    setWord(r);
    fetchAnagrams(r);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">🔠 Anagram Finder</h1>
        </header>

        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <input
              value={word}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type a word..."
              className="flex-1 p-4 border border-slate-200 rounded-lg focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition"
            />
            <div className="flex gap-2">
              <button
                onClick={() => fetchAnagrams()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:scale-[1.02] transition"
                disabled={!!validateInput(word)}
              >
                {loading ? "Searching…" : "Find"}
              </button>
              <button
                onClick={randomTest}
                className="px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
              >
                Random
              </button>
            </div>
            <input
              title="number"
              type="number"
              min={10}
              max={1000}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value || 100))}
              className="w-24 p-2 border rounded"
            />
          </div>

          {error && <div className="text-red-600 mt-4">{error}</div>}

          {anagrams.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <div className="text-sm text-slate-600">
                  Found {anagrams.length} anagrams {source && `(source: ${source})`} {tookMs !== null && `• ${tookMs}ms`}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(anagrams.join(", "))}
                  className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:scale-[1.03] transition"
                >
                  Copy all
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {anagrams.map((a, i) => (
                  <div
                    key={a + i}
                    className="p-3 bg-white/80 border border-slate-100 rounded-lg transform transition hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${i * 25}ms` }}
                  >
                    <div className="font-medium">{a}</div>
                    <div className="text-xs text-slate-400 mt-1">len {a.length}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <svg className="w-6 h-6 animate-spin text-purple-600" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.15" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Loading…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
