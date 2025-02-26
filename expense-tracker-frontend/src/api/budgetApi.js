const API_URL = "http://localhost:5000/api/budget";

export const setBudget = async (budgetData) => {
    const response = await axios.post(API_URL, budgetData, {withCredentials: true});
    return response.data;
};

export const getBudget = async (month, year) => {
    const response = await axios.get(`${API_URL}?month=${month}&year=${year}`, {withCredentials: true});
    return response.data;
};

export const getMonthlyExpenses = async (month, year) => {
    const response = await axios.get(`${API_URL}/expenses?month=${month}&year=${year}`, {withCredentials: true});
    return response.data;
};

export const getCategoryBreakdown = async (month, year) => {
    const response = await axios.get(`${API_URL}/breakdown?month=${month}&year=${year}`, {withCredentials: true});
    return response.data;
};