import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingProduct = state.find((item) => item.id === action.payload);
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        return state.filter((item) => item.id !== action.payload);
      }
    },
    setCart: (state, action) => {
        return action.payload;
      },
  },
});

export const { addToCart, removeFromCart,setCart } = cartSlice.actions;
export default cartSlice.reducer;