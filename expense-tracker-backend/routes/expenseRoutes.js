const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

// Expense Routes
router.post("/", verifyToken, addExpense);
router.get("/", verifyToken, getExpenses);
router.put("/:id", verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);

module.exports = router;
