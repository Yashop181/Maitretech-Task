import { createSlice } from "@reduxjs/toolkit";

// in starting the array is empty
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
    // name of the slice
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    // adding the item to the cart
    addtocart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        alert("Already in cart");
      } else {
        state.cart.push(action.payload);
      }
    },
    // increasing the value of the cart 
    qtyIncrease: (state, action) => {
      const itemToUpdate = state.cart.find(item => item.id === action.payload.id);
      if (itemToUpdate) {
        itemToUpdate.quantity++;
        
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });

      }
    },
        // decreasing the value of the cart 
    qtyDecrease: (state, action) => {
      const itemToUpdate = state.cart.find(item => item.id === action.payload.id);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
      } else if (itemToUpdate && itemToUpdate.quantity === 1) {
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
      }
    },
  },
});

export const { addtocart, qtyIncrease, qtyDecrease } = cartSlice.actions;
export default cartSlice.reducer;
