// Redux
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, removeUser } = authSlice.actions;

export default authSlice.reducer;
