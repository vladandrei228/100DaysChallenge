import type { Category } from "../types";

export const defaultCategories:Category[] = [
  { id: "food", name: "Food", icon: "🍔" },
  { id: "transport", name: "Transport", icon: "🚌" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "general", name: "General", icon: "💸" },
];

export function getCategoryIcon(id: string) {
  const category = defaultCategories.find((c) => c.id === id);
  return category ? category.icon : "💸";
}