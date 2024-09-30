import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index >= 0) {
                state.items[index].quantity += 1;
            } else {
                const newItem = { ...action.payload, quantity: 1 };
                state.items.push(newItem);
                state.totalQuantity += 1;
            }

            state.totalAmount += action.payload.price;
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            // Update totalQuantity and totalAmount
            const removedItem = state.items.find(item => item.id === action.payload);
            if (removedItem) {
                state.totalQuantity -= removedItem.quantity;
                state.totalAmount -= removedItem.price * removedItem.quantity;
            }
        },
        updateQuantity: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                const currentQuantity = state.items[itemIndex].quantity;
                const newQuantity = action.payload.quantity;

                // Update totalQuantity and totalAmount
                state.totalQuantity += newQuantity - currentQuantity;
                state.totalAmount += (newQuantity - currentQuantity) * state.items[itemIndex].price;

                // Set the new quantity
                state.items[itemIndex].quantity = newQuantity;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
