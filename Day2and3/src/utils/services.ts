// src/utils/services.ts
import { supabase } from "./supabaseClient";
import type { Expense, ExpenseInsert, Category } from "../types";

// Categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return (data as Category[]) || [];
}

// Expenses
export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data as Expense[]) || [];
}

export async function insertExpense(payload: ExpenseInsert): Promise<Expense> {
  const { data, error } = await supabase
    .from("expenses")
    .insert([payload])
    .select()
    .single(); // returns the inserted row, including id
  if (error) throw error;
  return data as Expense;
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}
