import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import toastReducer from "./features/toast/toastSlice";
import cartReducer from "./features/cart/cartSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import filterReducer from "./features/filters/filterSlice";
import loadingReducer from "./features/loading/loadingSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		toast: toastReducer,
		cart: cartReducer,
		wishlist: wishlistReducer,
		filters: filterReducer,
		loading: loadingReducer,
	},
});
