import React from "react";
import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";

const ExpenseList = () => {
  const { expenses, isLoading, deleteExpense } = useExpenses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-[1.02]">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Expense History</h2>

      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-2">No expenses recorded yet.</p>
        ) : (
          <ul className="space-y-3">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
                className="transition hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
