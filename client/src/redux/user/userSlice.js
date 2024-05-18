import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      console.log("signInStart: state.loading =", state.loading); // Debug log
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log("signInSuccess: state =", state); // Debug log
    },
    signInFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("signInFailed: state.error =", state.error); // Debug log
    },
  },
});

export const { signInStart, signInSuccess, signInFailed } = userSlice.actions;
export default userSlice.reducer;
