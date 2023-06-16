import axios from 'axios';

import { authenticateUser } from 'store/authSlice';
import { initialState } from 'store/customizationReducer';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Set the base URL of your API
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3001', // Replace with your client's origin
  },
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

export const login = (res,dispatch) => {
  const { token, id, role, userInfo } = res.data;

  localStorage.setItem('token', token); // Adjust the key according to your project
  axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;

  dispatch(
    authenticateUser({
      isConnected: true,
      token,
      id,
      role,
      userInfo,
    })
  );
};




export const validate = () => {
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
