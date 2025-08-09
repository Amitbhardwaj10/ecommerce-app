import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	message: "",
	type: "default",
	show: false,
};

export const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		showToast: (state, action) => {
			if (action.payload.message) {
				state.show = true;
				state.message = action.payload.message;
				state.type = action.payload.type || "default";
			}
		},

		hideToast: (state) => {
			state.show = false;
			state.message = "";
			state.type = "default";
		},
	},
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
