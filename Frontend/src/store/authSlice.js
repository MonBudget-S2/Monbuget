import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isCheckingForToken: true,
    isConnected: false,
    token: null,
    id: null,
    role: null,
    userInfo: null
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
    setIsCheckingForToken: (state, action) => {
      state.isCheckingForToken = action.payload;
    }
  }
});

export const { authenticateUser, setIsCheckingForToken } = authSlice.actions;

export const isAdmin = (state) => state.auth.role === 'ADMIN';
export const isLogged = (state) => state.auth.isConnected;
export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.auth.id;
export const getUserInfo = (state) => state.auth.userInfo;
export const getUser = (state) => state.auth;
export const selectIsCheckingForToken = (state) => state.auth.isCheckingForToken;
export default authSlice.reducer;
