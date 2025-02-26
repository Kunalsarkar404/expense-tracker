import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/budget";

export const getBudget = async (month, year) => {
    try {
        const res = await axios.get(`${API_URL}?month=${month}&year=${year}`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("Error fetching budget:", err);
        return { amount: 0 };
    }
}

export const setBudget = async (budgetData) => {
    try {
        const response = await axios.post(API_URL, budgetData, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.error("Error setting budget:", err);
        throw err;
    }
}