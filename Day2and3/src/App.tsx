import './App.css'
import ExpenseForm from './components/ExpenseForm';
import { useExpenses } from "./hooks/useExpenses";
import { getCategoryIcon } from './utils/categories';
import StatsCards from './components/StatsCards';
import CategoryChart from './components/CategoryChart';


function App() {
  const { expenses , addExpense , deleteExpenses , todayTotal , lastWeekTotal , monthTotal , total } = useExpenses();

  return (
    <>
      <div  className='p-6 max-2-4xl mx-auto space-y-6'>
        <h1 className='text-2xl font-bold'>💰 Personal Finance Dashboard</h1>

        <StatsCards today={todayTotal} week={lastWeekTotal} month={monthTotal} total={total}/>

        <div className='grid grid-cols-2 gap-6'>
          <ExpenseForm onAddExpense={addExpense}/>
          <CategoryChart expenses={expenses} />
        </div>
        

        <div className='bg-white shadow-2xl rounded p-4'>
          <h2 className='text-lg font-semibold'>Recent Expenses</h2>
          <ul className='space-y-4'>
            {expenses.map((exp) => (
              <li key={exp.id} className='flex justify-between'>
                <span>
                  {getCategoryIcon(exp.category)} {exp.title} - {exp.amount}$
                </span>
                <button
                  onClick={() => deleteExpenses(exp.id)}
                  className='text-red-500 hover:text-red-700'
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
