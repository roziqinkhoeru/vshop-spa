import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const loadWishlistFromStorage = () => {
  try {
    const encryptedWishlistData = localStorage.getItem('vWishlist');
    if (!encryptedWishlistData) {
      return [];
    }

    const bytes = CryptoJS.AES.decrypt(encryptedWishlistData, ENCRYPTION_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData || [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToStorage = (wishlistData) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(wishlistData),
      ENCRYPTION_KEY,
    ).toString();
    localStorage.setItem('vWishlist', encryptedData);
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const initialState = {
  wishlistItems: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const newItem = action.payload;
      const selectWishlistIndex = state.wishlistItems.findIndex(
        (product) => product.id === newItem.id,
      );
      if (selectWishlistIndex !== -1) {
        state.wishlistItems.splice(selectWishlistIndex, 1);
      } else {
        state.wishlistItems.push(newItem);
      }
      saveWishlistToStorage(state.wishlistItems);
    },
    removeItemFromWishlist: (state, action) => {
      const targetId = action.payload.id;
      const selectWishlistIndex = state.wishlistItems.findIndex(
        (product) => product.id === targetId,
      );
      if (selectWishlistIndex !== -1) {
        state.wishlistItems.splice(selectWishlistIndex, 1);
      }
      saveWishlistToStorage(state.wishlistItems);
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;
export const selectTotalWishlistItems = (state) => state.wishlist.wishlistItems.length;

export default wishlistSlice.reducer;
