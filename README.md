# Expense Tracker

## 📌 Project Overview
A **Full-Stack Expense Tracker** that helps users manage their finances by setting budgets, tracking expenses, and visualizing spending trends. Built with **React (Frontend)**, **Express.js (Backend)**, and **PostgreSQL (Database)**, it provides authentication, budget tracking, and analytics.

## 🏛️ Architecture & Tech Stack
```
expense-tracker/
│── frontend/        # React + Vite (Client-side)
│── backend/         # Express.js + PostgreSQL (Server-side)
│── .gitignore       # Git ignore file
│── README.md        # Project documentation
│── package.json     # Monorepo dependencies (optional)
```

### **Tech Stack:**
- **Frontend:** React (Vite), Tailwind CSS, React Query, Axios
- **Backend:** Node.js, Express.js, PostgreSQL (Prisma ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Netlify (Frontend), Render (Backend)
- **API Testing:** Postman / Thunder Client

## ✨ Features
### **Frontend**
✅ User Authentication (Login/Signup with JWT)
✅ Budget Management (Set monthly budgets)
✅ Expense Tracking (Add, Edit, Delete expenses)
✅ Responsive Dashboard with Budget Summary
✅ Data Visualization (Charts for spending trends)
✅ Error Handling & Toast Notifications

### **Backend**
✅ Secure API with JWT Authentication
✅ CRUD operations for budgets & expenses
✅ Middleware for authentication & error handling
✅ PostgreSQL database integration with Prisma ORM
✅ Rate limiting for API security

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Kunalsarkar404/expense-tracker.git
cd expense-tracker
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install     # Install dependencies
npm run dev     # Start the server
```

#### **Environment Variables (backend/.env)**
```env
DATABASE_URL="postgresql://postgres:1212@localhost:5432/expense_tracker"
JWT_SECRET="your_secret_key"
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install     # Install dependencies
npm run dev     # Start the frontend
```

#### **Environment Variables (frontend/.env)**
```env
VITE_API_URL=http://localhost:8000/api
```

### **4️⃣ Running the Application**
- **Backend:** Runs on `http://localhost:8000`
- **Frontend:** Runs on `http://localhost:5173`

## 📡 API Endpoints
### **Auth Routes**
| Method | Endpoint          | Description         |
|--------|------------------|---------------------|
| POST   | `/api/auth/signup` | User registration  |
| POST   | `/api/auth/login`  | User login & JWT   |

### **Budget Routes**
| Method | Endpoint         | Description                      |
|--------|-----------------|----------------------------------|
| GET    | `/api/budget`   | Get user budget                 |
| POST   | `/api/budget`   | Set monthly budget              |
| PUT    | `/api/budget/:id` | Update budget                  |

### **Expense Routes**
| Method | Endpoint         | Description                      |
|--------|-----------------|----------------------------------|
| GET    | `/api/expenses` | Get all expenses                |
| POST   | `/api/expenses` | Add a new expense               |
| PUT    | `/api/expenses/:id` | Update an expense          |
| DELETE | `/api/expenses/:id` | Delete an expense          |

## 🌍 Deployment Guide
### **Backend Deployment (Render)**
1. Push your backend code to **GitHub**.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your repository and set the **Build Command:**
   ```sh
   npm install && npm run build
   ```
4. Add **Environment Variables** (`DATABASE_URL`, `JWT_SECRET`).
5. Deploy and get the **live API URL**.

### **Frontend Deployment (Netlify)**
1. Push your frontend code to **GitHub**.
2. Go to [Netlify](https://www.netlify.com/) and create a new site.
3. Connect the repository and set the **Build Command:**
   ```sh
   npm run build
   ```
4. Add **Environment Variables** (`VITE_API_URL` with your Render backend URL).
5. Deploy and get the **live site URL**.

## 🎯 Future Enhancements
🚀 **Category-wise Spending Analytics**
🚀 **Dark Mode Support**
🚀 **Export Expense Reports (CSV/PDF)**
🚀 **Multi-user Budget Collaboration**

## 💡 Contributing
Contributions are welcome! Feel free to submit a PR. 🚀

---
Made with ❤️ by [Kunalsarkar]([https://github.com/your-username](https://github.com/Kunalsarkar404))

