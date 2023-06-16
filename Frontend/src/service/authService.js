import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Set the base URL of your API
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3001', // Replace with your client's origin
  },
});

export const login = async (credentials) => {
  try {
   // const baseUrl = "http://127.0.0.1:3000";
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};