import axiosInstance from './axiosInterceptor';

const getDebts = async () => {
  return await axiosInstance.get('/debts');
};

const getReceivables = async () => {
  return await axiosInstance.get('/debts/received');
};

const payDebt = async (debtId, amount) => {
  return await axiosInstance.patch(`/debts/${debtId}/pay`, { amount });
};

const debtService = {
  getDebts,
  payDebt,
  getReceivables
};

export default debtService;
