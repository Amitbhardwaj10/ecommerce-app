import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";

const initialState = {
	isLoggedIn: !!localStorage.getItem("isLoggedIn"),
	user: JSON.parse(localStorage.getItem("user")) || null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
			localStorage.setItem("isLoggedIn", true);
			localStorage.setItem("user", JSON.stringify(action.payload));
		},

		logoutSuccess: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem("isLoggedIn");
			localStorage.removeItem("user");
		},
	},
});

export const { login, logoutSuccess } = authSlice.actions;

export const logout = () => (dispatch) => {
	dispatch(logoutSuccess());
	dispatch(clearCart());
};

export default authSlice.reducer;
