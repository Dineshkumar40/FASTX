// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  roleType: null,
  jwtToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, roleType, jwtToken } = action.payload;
      state.userId = userId;
      state.roleType = roleType;
      state.jwtToken = jwtToken;
    },
    logout: (state) => {
      state.userId = null;
      state.roleType = null;
      state.jwtToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
