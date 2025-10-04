import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { Expense } from "../types";
import { defaultCategories } from "../utils/categories";

interface CategoryChartProps {
    expenses: Expense[];
}

export default function CategoryChart({ expenses }: CategoryChartProps) {
    const data = defaultCategories.map(cat => ({
        name: cat.name,
        value: expenses.filter(e => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0),
        icon: cat.icon
    })).filter(d => d.value > 0);

    return (
        <div className="bg-white shadow rounded p-4">
            <h2 className="font-semibold mb-4">Expenses Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({name, value}) => `${name}: ${value}`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={`hsl(${index*60}, 70%, 50%)`} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}