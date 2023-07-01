import axiosInstance from './axiosInterceptor';

const addIncome = async (credentials) => {
  console.log('createIncome', credentials);
  return await axiosInstance.post('/incomes', credentials);
};

const getIncomes = async () => {
  return await axiosInstance.get('/incomes');
};

const getIncomeByTypeForYear = async (year) => {
  return await axiosInstance.get(`/incomes/types/${year}`);
};

const updateIncome = async (id, credentials) => {
  return await axiosInstance.put(`/incomes/${id}`, credentials);
};

const deleteIncome = async (id) => {
  return await axiosInstance.delete(`/incomes/${id}`);
};

const incomeService = {
  addIncome,
  updateIncome,
  getIncomes,
  deleteIncome,
  getIncomeByTypeForYear
};

export default incomeService;
