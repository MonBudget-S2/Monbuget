import axiosInstance from './axiosInterceptor';

const addExpense = async (credentials) => {
  return await axiosInstance.post('/expenses', credentials);
};

const getExpenses = async () => {
  return await axiosInstance.get('/expenses');
};

const updateExpense = async (id, credentials) => {
  return await axiosInstance.put(`/expenses/${id}`, credentials);
};

const deleteExpense = async (id) => {
  return await axiosInstance.delete(`/expenses/${id}`);
};

const expenseService = {
  addExpense,
  updateExpense,
  getExpenses,
  deleteExpense
};

export default expenseService;
