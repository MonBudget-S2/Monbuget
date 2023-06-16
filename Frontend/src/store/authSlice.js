import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isConnected: false,
    token: null,
    id: null,
    role: null,
    userInfo: null,
  },
  reducers: {
    authenticateUser: (state, action) => {
      const { isConnected, token, id, role, userInfo } = action.payload;
      state.isConnected = isConnected;
      state.token = token;
      state.id = id;
      state.role = role;
      state.userInfo = userInfo;

      // const user = {
      //   isConnected,
      //   token,
      //   id,
      //   role,
      //   userInfo
      // };
      
      // localStorage.setItem('user', JSON.stringify(user));
    },
  },
});

export const { authenticateUser } = authSlice.actions;

export const isAdmin = (state) => state.auth.role === 'ADMIN';
export const isLogged = (state) => state.auth.isConnected;
export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.auth.id;
export const getUserInfo = (state) => state.auth.userInfo;
export const getUser = (state) => state.auth;
export default authSlice.reducer;


