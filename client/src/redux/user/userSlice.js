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
    updatingUserbegin: (state) => {
      state.loading = true;
      console.log("updatingUserbegin: state =", state);
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log("updateUserSuccess: state =", state);
    },
    updateUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("updateUserFailed: state =", state);
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  updatingUserbegin,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
