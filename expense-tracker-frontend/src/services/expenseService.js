import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/expenses";

export const getExpenses = async () => {
    try {
        const res = await axios.get(API_URL, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
};

export const addExpense = async (expense) => {
    const res = await axios.post(API_URL, expense, { withCredentials: true });
    return res.data;
};

export const deleteExpense = async (expenseId) => {
    await axios.delete(`${API_URL}/${expenseId}`, { withCredentials: true });
};