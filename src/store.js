import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/producList/productSlice';
import filterSlice from './features/producList/filterSlice';
import wishlistSlice from './features/wishlist/wishlistSlice';

export default configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    filter: filterSlice,
    wishlist: wishlistSlice,
  },
});
