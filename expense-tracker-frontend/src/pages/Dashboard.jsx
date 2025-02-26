import React, { useState, useEffect, useRef } from "react";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseChart from "../components/charts/ExpenseChart";
import BudgetSummary from "../components/budget/BudgetSummary";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, UserCircle2Icon, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout, getUserName } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & App Name */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <CreditCard size={20} />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-800">Expense Tracker</h1>
          </motion.div>

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 rounded-full py-2 px-3 hover:bg-gray-100 transition-all"
            >
              <UserCircle2Icon size={24} className="text-gray-700" />
              <span className="font-medium">{getUserName()}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Budget Summary */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BudgetSummary />
      </motion.section>

      {/* Expense Form & List */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <motion.div
          className="bg-white p-4 shadow rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-2">Add Expense</h2>
          <ExpenseForm />
        </motion.div>

        <motion.div
          className="bg-white p-4 shadow rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-2">Your Expenses</h2>
          <ExpenseList />
        </motion.div>
      </div>

      {/* Expense Chart */}
      <motion.div
        className="bg-white p-4 shadow rounded-lg mt-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ExpenseChart />
      </motion.div>
    </div>
  );
};

export default Dashboard;
