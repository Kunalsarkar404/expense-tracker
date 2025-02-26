import React from "react";
import { useBudget } from "../../hooks/useBudget";
import BudgetProgress from "../charts/BudgetProgress";
import BudgetForm from "./BudgetForm";
import { motion } from "framer-motion";

const BudgetSummary = () => {
  const { budget, totalExpenses } = useBudget();
  const remainingBudget = budget.amount - totalExpenses;
  const isOverBudget = remainingBudget < 0;

  return (
    <motion.div
      className="bg-white p-6 shadow-lg rounded-2xl transition-all hover:shadow-2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Budget Form */}
      <BudgetForm />

      {/* Budget Summary */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Budget Summary</h2>

        {/* Total Budget Display */}
        <p className="text-gray-600 text-lg">
          <span className="font-medium text-gray-700">Total Budget:</span>{" "}
          <span className="font-bold text-blue-600">₹{budget?.amount || 0}</span>
        </p>

        {/* Remaining Budget with Conditional Styling */}
        <p
          className={`text-lg font-semibold mt-2 ${
            isOverBudget ? "text-red-600" : "text-green-600"
          }`}
        >
          {isOverBudget ? "Over Budget! ❌" : "Remaining Budget ✅"}: ₹{remainingBudget}
        </p>

        {/* Budget Progress Bar */}
        <div className="mt-4">
          <BudgetProgress budget={budget} expenses={totalExpenses} />
        </div>

        {/* Over Budget Warning */}
        {isOverBudget && (
          <motion.p
            className="text-red-600 mt-3 text-sm font-medium bg-red-100 p-3 rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            ⚠️ You have exceeded your budget! Consider adjusting your expenses.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetSummary;
