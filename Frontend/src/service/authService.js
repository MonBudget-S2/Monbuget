import axios from 'axios';

import { authenticateUser } from 'store/authSlice';
import { initialState } from 'store/customizationReducer';

const url =
   process.env.NODE_ENV === "production"
     ? process.env.REACT_APP_URL_PROD
     : process.env.REACT_APP_URL_DEV;


const api = axios.create({
  baseURL: url // Set the base URL of your API
});

// export const login = async (credentials) => {
//   try {
//    // const baseUrl = "http://127.0.0.1:3000";
//     const response = await api.post("/users/login", credentials);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

const register = async (credentials) => {
  console.log('register', credentials);
  return await api.post('/users/register', credentials);
};

const login = (res, dispatch) => {
  const { token, id, role, userInfo } = res.data;

  localStorage.setItem('token', token); // Adjust the key according to your project
  localStorage.setItem("user", JSON.stringify(res.data));
  axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;

  dispatch(
    authenticateUser({
      isConnected: true,
      token,
      id,
      role,
      userInfo
    })
  );
};

const validate = () => {
  const token = localStorage.getItem('token'); // Adjust the key according to your project

  return new Promise((resolve, reject) => {
    if (token) {
      api
        .post(`/users/validateToken`, { token })
        .then((response) => {
          // const { isConnected, id, role, isAdmin, userInfo } = response.data;

          resolve(response.data);
        })
        .catch(() => {
          reject(initialState);
        });
    } else {
      reject(initialState);
    }
  });
};


const authService = {
  register,
  login,
  validate
};

export default authService;
