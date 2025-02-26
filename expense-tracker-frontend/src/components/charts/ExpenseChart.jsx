import React from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const { expenses } = useExpenses();

  // Group expenses by title
  const categories = {};
  expenses.forEach(({ title, amount }) => {
    categories[title] = (categories[title] || 0) + amount;
  });

  const data = {
    labels: Object.keys(categories), // Expense categories
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#4CAF50", // Green
          "#FF5733", // Red
          "#FFC107", // Yellow
          "#2196F3", // Blue
          "#9C27B0", // Purple
          "#FF9800", // Orange
          "#607D8B", // Gray-Blue
        ],
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 12,
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 5,
      },
    },
  };

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Expense Breakdown
      </h2>
      <div className="flex justify-center">
        <div className="w-72 h-72">
          <Pie data={data} options={options} />
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseChart;
