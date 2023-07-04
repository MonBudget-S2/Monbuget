import axiosInstance from './axiosInterceptor';

const addExpense = async (credentials) => {
  return await axiosInstance.post('/expenses', credentials);
};

const uploadFacture = async (id,file)=>{
  return await axiosInstance.patch(`/expenses/upload/facture/${id}`,file);
}

const getExpenses = async () => {
  return await axiosInstance.get('/expenses');
};

const updateExpense = async (id, credentials) => {
  return await axiosInstance.put(`/expenses/${id}`, credentials);
};

const deleteExpense = async (id) => {
  return await axiosInstance.delete(`/expenses/${id}`);
};

const getExpensesByCategoryAndPeriod = async (year, month) => {
  if (!month) {
    return await axiosInstance.get(`/expenses/categories/${year}`);
  }
  return await axiosInstance.get(`/expenses/categories/${year}/${month}`);
};

const getExpensesByPeriod = async (year, month) => {
  if (!month) {
    return await axiosInstance.get(`/expenses/total/${year}`);
  }
  return await axiosInstance.get(`/expenses/total/${year}/${month}`);
};

const expenseService = {
  addExpense,
  updateExpense,
  getExpenses,
  deleteExpense,
  getExpensesByCategoryAndPeriod,
  getExpensesByPeriod,
  uploadFacture
};

export default expenseService;
