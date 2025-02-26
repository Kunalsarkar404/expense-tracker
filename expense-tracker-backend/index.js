require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());


//Route
app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes)

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
