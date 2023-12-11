import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/producList/productSlice';

export default configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});
