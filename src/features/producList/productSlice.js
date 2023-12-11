import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productItems: [],
  categories: ["men's clothing", 'jewelery', 'electronics', "women's clothing"],
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productItems = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setError } = productSlice.actions;

export default productSlice.reducer;

// selector
export const productsSelector = (state) => state.product.productItems;
export const categorySelector = (state) => state.product.categories;
