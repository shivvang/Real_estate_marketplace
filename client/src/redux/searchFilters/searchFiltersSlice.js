// src/redux/slices/searchFiltersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  propertyType: "all",
  transactionType: "all",
  sort: "createdAt",
  order: "desc",
  furnished: false,
  balcony: false,
  parking: false,
  powerBackup: false,
  lift: false,
  security: false,
  waterSupply: false,
  gymnasium: false,
  swimmingPool: false,
  clubhouse: false,
  garden: false,
  cctvSecurity: false,
  minPrice: 0,
  maxPrice: 1000000000,
};

const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    setSearchFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetSearchFilters() {
      return initialState;
    },
  },
});

export const { setSearchFilters, resetSearchFilters } =
  searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
