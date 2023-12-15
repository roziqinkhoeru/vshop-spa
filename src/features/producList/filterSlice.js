import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    category: 'all',
    search: '',
    sortBy: 'relevance',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    resetFilter: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setCategory, setSearch, setSortBy, resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
