// utils/migrateLocalToSupabase.ts
import type { Expense } from "../types";
import { insertExpense } from "./services";

export async function migrateLocalToSupabase() {
  const raw = localStorage.getItem("expenses");
  if (!raw) return { migrated: 0 };

  const localExpenses: Expense[] = JSON.parse(raw);
  for (const e of localExpenses) {
    await insertExpense({
      title: e.title,
      amount: e.amount,
      category: e.category,
      date: e.date,
    });
  }
  localStorage.removeItem("expenses");
  return { migrated: localExpenses.length };
}
