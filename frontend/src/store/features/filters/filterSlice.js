import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selected: {
		categories: [],
		brands: [],
		colors: [],
		price: [0, 10000], // [min, max]
	},
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.selected.categories = action.payload;
		},
		setBrand: (state, action) => {
			state.selected.brands = action.payload;
		},
		setColor: (state, action) => {
			state.selected.colors = action.payload;
		},
		setPrice: (state, action) => {
			state.selected.price = action.payload;
		},
		clearFilters: (state) => {
			state.selected = initialState.selected;
		},
	},
});

export const { setCategory, setBrand, setColor, setPrice, clearFilters } =
	filterSlice.actions;
export default filterSlice.reducer;
