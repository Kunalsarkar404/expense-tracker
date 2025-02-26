const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const userId = req.userId;

    if (!title || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = await prisma.expense.create({
      data: { title, amount: parseFloat(amount), date: new Date(date), userId },
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

// Get Expenses
const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    const totalExpenses = await prisma.expense.count({ where: { userId } });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const { id } = req.params;
    const userId = req.userId;

    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense || expense.userId !== userId) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: { title, amount: parseFloat(amount), date: new Date(date) },
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense || expense.userId !== userId) {
      return res.status(404).json(expense);
    }

    await prisma.expense.delete({ where: { id } });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
