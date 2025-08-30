import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selected: {
		categories: [],
		brands: [],
		colors: [],
		price: [], // [min, max]
		inStock: [],
	},
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		toggleFilter: (state, action) => {
			const { key, value } = action.payload;
			const currentValues = state.selected[key];
			if (currentValues.includes(value)) {
				state.selected[key] = currentValues.filter((v) => v !== value);
			} else {
				state.selected[key].push(value);
			}
		},
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
		setInStock: (state, action) => {
			state.selected.inStock = action.payload;
		},
		clearFilters: (state) => {
			state.selected = initialState.selected;
		},
	},
});

export const {
	toggleFilter,
	setCategory,
	setBrand,
	setColor,
	setPrice,
	setInStock,
	clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
