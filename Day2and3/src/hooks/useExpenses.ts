// src/hooks/useExpenses.ts
import { useState, useEffect, useCallback } from "react";
import type { Expense, ExpenseInsert } from "../types";
import { getExpenses, insertExpense, deleteExpense } from "../utils/services";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (e) {
        if(e){
            setError("Failed to load expenses");
        }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const addExpense = async (payload: ExpenseInsert) => {
    setLoading(true);
    setError(null);
    try {
      const inserted = await insertExpense(payload);
      // Optimistic: append inserted row with DB-generated id
      setExpenses(prev => [inserted, ...prev]);
      // Or, if you prefer strict consistency:
      // await loadExpenses();
    } catch (e) {
        if(e){
            setError("Failed to add expense");
        }
    } finally {
      setLoading(false);
    }
  };

  const deleteExpenses = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      if(e){
          setError("Failed to delete expense");
      }
    } finally {
      setLoading(false);
    }
  };

  // Totals
  const today = new Date().toISOString().split("T")[0];
  const todayTotal = expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0);
  const lastWeek = new Date().setDate(new Date().getDate() - 7);
  const lastWeekTotal = expenses.filter(e => new Date(e.date).getTime() > lastWeek).reduce((s, e) => s + e.amount, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = expenses.filter(e => e.date.startsWith(thisMonth)).reduce((s, e) => s + e.amount, 0);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return { expenses, addExpense, deleteExpenses, todayTotal, lastWeekTotal, monthTotal, total, loading, error };
}
