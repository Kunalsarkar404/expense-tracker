const express = require("express");
const { verifyToken } = require("../controllers/authController");
const { setBudget, getBudget, getMonthlyExpenses} = require("../controllers/budgetController");

const router = express.Router();

router.post("/", verifyToken, setBudget);
router.get("/", verifyToken, getBudget);
router.get("/expenses", verifyToken, getMonthlyExpenses);

module.exports = router;