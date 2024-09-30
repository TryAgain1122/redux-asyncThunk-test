import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        product: ProductSlice,
        cart: cartSlice,
    }
})

export default store