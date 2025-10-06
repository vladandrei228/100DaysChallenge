import type { Expense } from "../types";

const STORAGE_KEY = "expenses";

export function getExpenses(): Expense[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveExpenses(expenses: Expense[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}