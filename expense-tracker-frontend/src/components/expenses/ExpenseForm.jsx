import { useState } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { Calendar, DollarSign, Tag } from "lucide-react";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({ title: "", amount: "", date: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { addExpense } = useExpenses();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.date) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await addExpense(formData);
      setFormData({ title: "", amount: "", date: "" });
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition transform hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4">
        <h2 className="text-xl font-semibold">New Expense</h2>
        <p className="text-blue-100 text-sm">Record your spending</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/** Input Fields */}
        {[
          { id: "title", type: "text", placeholder: "Coffee, Rent, etc.", icon: <Tag size={18} /> },
          { id: "amount", type: "number", placeholder: "0.00", min: "0.01", step: "0.01", icon: <DollarSign size={18} /> },
          { id: "date", type: "date", placeholder: "", icon: <Calendar size={18} /> },
        ].map(({ id, type, placeholder, min, step, icon }) => (
          <div key={id} className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 capitalize">
              {id}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">{icon}</div>
              <input
                id={id}
                type={type}
                name={id}
                placeholder={placeholder}
                min={min}
                step={step}
                value={formData[id]}
                onChange={handleChange}
                className="border border-gray-300 p-3 pl-10 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        ))}

        {/** Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
