import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/producList/productSlice';
import filterSlice from './features/producList/filterSlice';

export default configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    filter: filterSlice,
  },
});
