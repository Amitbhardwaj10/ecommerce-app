import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api";

const initialState = {
	wishlistItems: [],
};

export const fetchWishlist = createAsyncThunk(
	"wishlist/fetchWishlist",
	async ({ userId }, { rejectWithValue }) => {
		try {
			const res = await api.get(`/wishlist/${userId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || "Failed to fetch wishlist");
		}
	}
);

export const addToWishlist = createAsyncThunk(
	"wishlist/addToWishlist",
	async ({ userId, productId }, { rejectWithValue }) => {
		try {
			const res = await api.post(`/wishlist/${userId}/items`, { productId });
			return res.data;
		} catch (err) {
			return rejectWithValue(
				err.response?.data || "Failed to add item into wishlist"
			);
		}
	}
);

export const removeFromWishlist = createAsyncThunk(
	"wishlist/removeFromWishlist",
	async ({ itemId }, { rejectWithValue }) => {
		try {
			const res = await api.delete(`/wishlist/items/${itemId}`);
			return { itemId, message: res.data };
		} catch (err) {
			return rejectWithValue(err.response?.data);
		}
	}
);

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishlist.fulfilled, (state, action) => {
				state.wishlistItems = action.payload;
			})
			.addCase(addToWishlist.fulfilled, (state, action) => {
				const newItem = action.payload;
				const exists = state.wishlistItems.find(
					(item) => item.id == newItem.id
				);
				!exists && state.wishlistItems.push(newItem);
			})
			.addCase(removeFromWishlist.fulfilled, (state, action) => {
				const { itemId } = action.payload;
				state.wishlistItems = state.wishlistItems.filter(
					(item) => item.id !== itemId
				);
			});
	},
});

export default wishlistSlice.reducer;
