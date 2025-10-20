import { useEffect, useRef, useState } from "react";

export default function useDebouncedSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const cacheRef = useRef(new Map());
  const debounceRef = useRef(null);
  const abortRef = useRef(null);
  const lastRequestIdRef = useRef(0);
  const lastHandledRequestIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const q = (query || "").trim();

    if (!q) {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
      setResults([]);
      setLoading(false);
      setError(null);
      setFromCache(false);
      return;
    }

    if (cacheRef.current.has(q)) {
      setResults(cacheRef.current.get(q));
      setLoading(false);
      setError(null);
      setFromCache(true);
      return;
    }

    setLoading(true);
    setError(null);
    setFromCache(false);

    debounceRef.current = setTimeout(() => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      const requestId = ++lastRequestIdRef.current;

      fetch(`http://localhost:4000/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then((data) => {
          if (requestId < lastHandledRequestIdRef.current) return;
          lastHandledRequestIdRef.current = requestId;

          const items = (data && Array.isArray(data.results)) ? data.results : [];
          cacheRef.current.set(q, items);
          setResults(items);
          setLoading(false);
          setError(null);
          setFromCache(false);
        })
        .catch((err) => {
          if (err && (err.name === "AbortError" || err.code === "ABORT_ERR")) {
            return;
          }
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        });
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [query]);

  return { results, loading, error, fromCache };
}
