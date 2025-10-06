import { useState, useEffect } from "react";
import type { Expense, Category } from "../types";
import { useCategories } from "../hooks/useCategories";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => Promise<void> | void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const { categories, loading } = useCategories();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0 || !category) return;
    onAddExpense({ title: title.trim(), amount: parsedAmount, category, date });
    setTitle("");
    setAmount("");
    setCategory(categories.length > 0 ? categories[0].id : "");
    setDate(today);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">Add Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-3 py-2 w-full" />
        <input type="number" placeholder="Expense Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded px-3 py-2 w-full" />
        <select title="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2 w-full">
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <input title="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2 w-full" />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Expense
      </button>
    </form>
  );
}
