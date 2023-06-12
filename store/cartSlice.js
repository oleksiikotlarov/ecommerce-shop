import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cartItems: [],
    },
    reducers: {
      addToCart: (state, action) => {
        state.cartItems.push({ ...action.payload });
      },
      updateCart: (state, action) => {
        const { key, field, value } = action.payload;
        const item = state.cartItems.find((item) => item.key === key);
        if (item) {
          item[field] = value;
        }
      },
      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.key !== action.payload.key
        );
      },
      resetCart: (state) => {
        state.cartItems = [];
      },
    },
  });

export const { addToCart, updateCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
