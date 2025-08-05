import { createSlice } from "@reduxjs/toolkit";
import CartItem from "../../../components/CartItem";

const initialState = {
	cartItems: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const exists = state.cartItems.find((it) => it.id == item.id);
			if (!exists) {
				state.cartItems.push(item);
			}
		},

		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(it) => it.id !== action.payload.id
			);
		},

		quantityChange: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.cartItems.find((item) => item.id === id);
			if (item) {
				item.quantity = quantity;
			}
		},
	},
});

export const { addToCart, removeFromCart, quantityChange } = cartSlice.actions;
export default cartSlice.reducer;
