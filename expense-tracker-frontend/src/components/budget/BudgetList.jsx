
import React from 'react'
import { useBudget } from '../../hooks/useBudget'
import BudgetItem from './BudgetItem';

const BudgetList = () => {
  const { budget } = useBudget();
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Monthly Budget</h2>
      {!budget || budget.amount === 0 ? (
        <p className="text-gray-500">No budget set for this month.</p>
      ) : (
        <ul className="space-y-3">
          <BudgetItem budget={budget} />
        </ul>
      )}
    </div>
  );
};

export default BudgetList