const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ Set or Update Global Budget (Prevents Duplicates)
const setBudget = async (req, res) => {
    try {
        const { amount, month, year } = req.body;
        const userId = req.userId;

        if (!amount || !month || !year) {
            return res.status(400).json({ message: "Amount, month, and year are required" });
        }

        // Check if budget exists for the given month & year
        const existingBudget = await prisma.budget.findFirst({
            where: { userId, month, year },
        });

        if (existingBudget) {
            // Update existing budget
            const updatedBudget = await prisma.budget.update({
                where: { id: existingBudget.id },
                data: { amount: parseFloat(amount) },
            });
            return res.status(200).json(updatedBudget);
        }

        // Create new budget
        const newBudget = await prisma.budget.create({
            data: { userId, amount: parseFloat(amount), month, year },
        });

        res.status(201).json(newBudget);
    } catch (err) {
        res.status(500).json({ message: "Error setting budget", error: err.message });
    }
};

// ✅ Get Global Budget for a Given Month/Year (Returns 0 if not set)
const getBudget = async (req, res) => {
    try {
        const userId = req.userId;
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        const budget = await prisma.budget.findFirst({
            where: { userId, month: parseInt(month), year: parseInt(year) },
        });

        // Return 0 if no budget found
        res.status(200).json({ amount: budget ? budget.amount : 0 });
    } catch (err) {
        res.status(500).json({ message: "Error fetching budget", error: err.message });
    }
};

// ✅ Get Total Monthly Expenses (Returns 0 if no expenses)
const getMonthlyExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(year, month, 0);

        const totalExpenses = await prisma.expense.aggregate({
            _sum: { amount: true },
            where: { userId, date: { gte: startDate, lte: endDate } },
        });

        // Return 0 if no expenses found
        res.status(200).json({ totalSpent: totalExpenses._sum.amount || 0 });
    } catch (err) {
        res.status(500).json({ message: "Error fetching total expenses", error: err.message });
    }
};

module.exports = { setBudget, getBudget, getMonthlyExpenses };
