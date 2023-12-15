import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const loadCartFromStorage = () => {
  try {
    const encryptedCartData = localStorage.getItem('vCart');
    if (!encryptedCartData) {
      return [];
    }

    const bytes = CryptoJS.AES.decrypt(encryptedCartData, ENCRYPTION_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData || [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (cartData) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(cartData),
      ENCRYPTION_KEY,
    ).toString();
    localStorage.setItem('vCart', encryptedData);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  //   berisi fungsi fungsi untuk memanipulasi state
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id,
      );
      const countItem = newItem.quantity ? newItem.quantity : 1;
      const countPrice = newItem.totalPrice
        ? newItem.totalPrice
        : newItem.price;
      const countPoint = newItem.point ? newItem.point : newItem.id;

      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += countItem;
        state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * newItem.price;
        state.cartItems[selectCartIndex].point = state.cartItems[selectCartIndex].quantity * newItem.id;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: countItem,
          totalPrice: countPrice,
          point: countPoint,
        });
      }
      saveCartToStorage(state.cartItems);
    },
    minusItemFromCart: (state, action) => {
      const targetId = action.payload.id;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === targetId,
      );
      if (selectCartIndex !== -1) {
        if (state.cartItems[selectCartIndex].quantity > 1) {
          state.cartItems[selectCartIndex].quantity -= 1;
          state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * action.payload.price;
          state.cartItems[selectCartIndex].point = state.cartItems[selectCartIndex].quantity * action.payload.id;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== targetId,
          );
        }
      }
      saveCartToStorage(state.cartItems);
    },
    removeItemFromCart: (state, action) => {
      const targetId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== targetId);
      saveCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
  },
});

// actions ini sebegai kurir untuk mengirim data ke reducer
export const {
  addItemToCart,
  minusItemFromCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// selector
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalItemCart = (state) => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) => state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
export const selectTotalPoint = (state) => state.cart.cartItems.reduce((total, item) => total + item.point, 0);
