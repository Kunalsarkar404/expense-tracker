const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

//User Sign-up
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        })
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
}

//User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
        res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

//Logout
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

//Verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        req.userId = decoded.userId;
        next();
    });
};


module.exports = { registerUser, loginUser, logoutUser, verifyToken };