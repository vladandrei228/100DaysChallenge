// hooks/useCategories.ts
import { useState, useEffect } from "react";
import type { Category } from "../types";
import { getCategories } from "../utils/services";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message || "Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
