import { useState, useEffect } from "react";
import type { Expense } from "../types";
import { getExpenses, saveExpenses } from "../utils/storage";
import { v4 as uuid } from "uuid";

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        setExpenses(getExpenses());
    }, []);

    const addExpense = (expense: Omit<Expense, "id">) => {
        const newExpense = { ...expense, id: uuid()};
        const updated = [...expenses, newExpense];
        setExpenses(updated);
        saveExpenses(updated);
    };

    const deleteExpenses = (id: string) => {
        const updated = expenses.filter(e => e.id !== id);
        setExpenses(updated);
        saveExpenses(updated);
    };

    const today = new Date().toISOString().split('T')[0];

    const todayTotal = expenses.filter(e => e.date === today).reduce((sum, e) => sum + e.amount, 0);

    const lastWeek = new Date().setDate(new Date().getDate() - 7);
    const lastWeekTotal = expenses.filter(e => new Date(e.date).getTime() > lastWeek).reduce((sum, e) => sum + e.amount, 0);

    const thisMonth = new Date().toISOString().slice(0, 7);
    const monthTotal = expenses.filter(e => e.date.startsWith(thisMonth)).reduce((sum, e) => sum + e.amount, 0);

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return {expenses, addExpense, deleteExpenses, todayTotal, lastWeekTotal, monthTotal, total};

}