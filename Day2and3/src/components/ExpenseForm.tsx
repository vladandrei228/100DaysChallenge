import { useState } from 'react';
import type { Expense } from '../types';
import { defaultCategories } from '../utils/categories';

interface ExpenseFormProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}
export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(defaultCategories[0].id);
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount);
        if(!title.trim()) return("Title is required");
        if(isNaN(parsedAmount) || parsedAmount <= 0) return("Amount must be a positive number");

        onAddExpense({ title: title.trim() , amount: parsedAmount, category, date });

        setTitle('');
        setAmount("");
        setCategory(defaultCategories[0].id);
        setDate(today);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='bg-white shadow-2xl rounded p-4 space-y-4'>
                <h2 className="text-lg font-semibold">Add Expense</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input  type="text" placeholder="Expense Title"  value={title} onChange={(e) => setTitle(e.target.value)} className='border rounded px-3 py-2 w-full'/>
                <input type="number" placeholder="Expense Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className='border rounded px-3 py-2 w-full' />
                <select 
                title='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='border rounded px-3 py-2 w-full'>
                    {defaultCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                        </option>
                    ))}
                </select>
                <input type="date" placeholder="Expense Date" value={date} onChange={(e) => setDate(e.target.value)}
                className='border rounded px-3 py-2 w-full'/>
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Expense</button>
            </form>
      </>
    );
}