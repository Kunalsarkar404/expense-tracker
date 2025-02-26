import React from 'react'
import { useExpenses } from '../../hooks/useExpenses';

const ExpenseItem = ({ expense }) => {
    const { deleteExpense } = useExpenses();
    return (
        <li className="flex justify-between bg-gray-100 p-3 rounded">
            <div>
                <p className="font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <div className='flex justify-center items-center'>
                <span className="font-bold text-red-500">₹{expense.amount}</span>
                <button
                    onClick={() => deleteExpense(expense.id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                >
                    ❌
                </button>
            </div>
        </li>
    )
}

export default ExpenseItem