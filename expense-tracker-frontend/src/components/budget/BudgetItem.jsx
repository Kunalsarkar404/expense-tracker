import BudgetProgress from "../charts/BudgetProgress";


const BudgetItem = ({ budget }) => {
  return (
    <li className="bg-gray-100 p-3 rounded-lg">
      <h3 className="text-md font-semibold">Budget: {budget.amount} ₹</h3>
      <p className="text-gray-600">Month: {budget.month}, Year: {budget.year}</p>
      <BudgetProgress budget={budget} />
    </li>
  );
};

export default BudgetItem;
