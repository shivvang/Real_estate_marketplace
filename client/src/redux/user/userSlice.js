import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  signInStart: (state) => {
    state.loading = true;
  },
  signInSuccess: (state, action) => {
    state.currentUser = action.payload;
    state.loading = false;
    state.error = null;
  },
  signInFailed: (state, action) => {
    state.error = action.payload;
    state.loading = false;
  },
});

export const { signInStart, signInSuccess, signInFailed } = userSlice.actions;

export default userSlice.reducer;
