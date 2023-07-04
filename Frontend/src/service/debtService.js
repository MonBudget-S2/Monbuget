import axiosInstance from './axiosInterceptor';

const getDebts = async () => {
  return await axiosInstance.get('/debts');
};

const debtService = {
  getDebts
};

export default debtService;
