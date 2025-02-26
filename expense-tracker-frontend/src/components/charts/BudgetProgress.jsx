import { useBudget } from "../../hooks/useBudget";

const BudgetProgress = ({ expenses }) => {
    const { budget, totalExpenses } = useBudget();
    const spent = expenses;
    const spentPercentage = (spent / budget.amount) * 100;
    const isOverBudget = spentPercentage > 100;
    const progressWidth = Math.min(spentPercentage, 100);

    return (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-md">
            {/* Budget Info */}
            <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                <span className="text-gray-800">
                    <span className="font-semibold">Spent:</span> ₹{totalExpenses.toLocaleString()}
                </span>
                <span className="text-gray-800">
                    <span className="font-semibold">Remaining:</span> ₹{Math.max(budget.amount - spent, 0).toLocaleString()}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${
                        isOverBudget ? "bg-red-500" : "bg-gradient-to-r from-green-400 to-green-600"
                    }`}
                    style={{ width: `${progressWidth}%` }}
                ></div>

                {/* Animated Indicator */}
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-500"
                    style={{
                        width: `${progressWidth}%`,
                        background: isOverBudget ? "rgba(255, 0, 0, 0.2)" : "rgba(34, 197, 94, 0.2)",
                    }}
                ></div>
            </div>

            {/* Warning Message */}
            {isOverBudget && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                    ⚠ Budget exceeded! Consider adjusting your expenses.
                </p>
            )}
        </div>
    );
};

export default BudgetProgress;
