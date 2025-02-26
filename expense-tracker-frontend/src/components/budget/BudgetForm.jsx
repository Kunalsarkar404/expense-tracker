import React, { useState } from "react";
import { useBudget } from "../../hooks/useBudget";

const BudgetForm = () => {
    const [amount, setAmount] = useState("");
    const { setBudget, isSettingBudget } = useBudget();

    // Get current month & year
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const handleSubmit = (e) => {
        e.preventDefault();
        setBudget({ amount: parseFloat(amount), month, year });
        setAmount("");
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-700 text-center">Set Monthly Budget</h2>

            {/* Budget Amount Input */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Budget Amount
                </label>
                <input
                    type="number"
                    placeholder="Enter budget amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </div>

            {/* Month Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Select Month
                </label>
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                        </option>
                    ))}
                </select>
            </div>

            {/* Year Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Select Year
                </label>
                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    {Array.from({ length: 3 }, (_, i) => (
                        <option key={i} value={currentYear - 1 + i}>
                            {currentYear - 1 + i}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSettingBudget}
            >
                {isSettingBudget ? "Setting Budget..." : "Set Budget"}
            </button>
        </form>
    );
};

export default BudgetForm;
