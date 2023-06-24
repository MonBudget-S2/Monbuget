import axiosInstance from './axiosInterceptor';
// const url =
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_URL_PROD
//     : process.env.REACT_APP_URL_DEV;

// const url = 'http://127.0.0.1:3000';

// const api = axios.create({
//   baseURL: url
// });

const addIncome = async (credentials) => {
  console.log('createIncome', credentials);
  return await axiosInstance.post('/incomes', credentials);
};

const incomService = {
  addIncome
};

export default incomService;
