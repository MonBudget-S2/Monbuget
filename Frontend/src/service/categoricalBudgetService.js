import axiosInstance from './axiosInterceptor';

const addBudget = async (credentials) => {
  return await axiosInstance.post('/categoricalbudget', credentials);
};

const getCategories = async () => {
  return await axiosInstance.get('/categories');
};
const getBudgets = async () => {
  return await axiosInstance.get('/categoricalbudget');
};

const updateBudget = async (id, credentials) => {
  return await axiosInstance.put(`/categoricalbudget/${id}`, credentials);
};

const deleteBudget = async (id) => {
  return await axiosInstance.delete(`/categoricalbudget/${id}`);
};

const categoricalBudgetService = {
  addBudget,
  updateBudget,
  getBudgets,
  deleteBudget,
  getCategories
};

export default categoricalBudgetService;
