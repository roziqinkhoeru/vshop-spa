import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  //   berisi fungsi fungsi untuk memanipulasi state
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );
      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItemFromCart: (state, action) => {
      const targetId = action.payload.id;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === targetId
      );
      if (selectCartIndex !== -1) {
        state.cartItems.splice(selectCartIndex, 1);
      }
    },
  },
});

// actions ini sebegai kurir untuk mengirim data ke reducer
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;

// selector
export const selectTotalItemCart = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
