import axiosInstance from './axiosInterceptor';

const addBudget = async (credentials) => {
  return await axiosInstance.post('/budgets', credentials);
};

const getCategories = async () => {
  return await axiosInstance.get('/categories');
};
const getBudgets = async () => {
  return await axiosInstance.get('/budgets');
};

const updateBudget = async (id, credentials) => {
  return await axiosInstance.put(`/budgets/${id}`, credentials);
};

const deleteBudget = async (id) => {
  return await axiosInstance.delete(`/budgets/${id}`);
};

const addCategory = async (category) => {
  return await axiosInstance.post('/categories', category);
};

const categoricalBudgetService = {
  addBudget,
  updateBudget,
  getBudgets,
  deleteBudget,
  getCategories,
  addCategory
};

export default categoricalBudgetService;
