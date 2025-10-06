export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export type ExpenseInsert = Omit<Expense, "id">;