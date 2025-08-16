import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "../toast/toastSlice";
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
	async ({ userId, productId }, { dispatch, rejectWithValue }) => {
		try {
			const res = await api.post(`/wishlist/${userId}/items`, { productId });
			dispatch(
				showToast({
					message: "item added to wishlist",
					type: "success",
				})
			);
			return res.data;
		} catch (err) {
			dispatch(
				showToast({
					message: err.response?.data || "Failed to add item into wishlist",
					type: "error",
				})
			);
			return rejectWithValue(
				err.response?.data || "Failed to add item into wishlist"
			);
		}
	}
);

export const removeFromWishlist = createAsyncThunk(
	"wishlist/removeFromWishlist",
	async ({ itemId }, { dispatch, rejectWithValue }) => {
		try {
			const res = await api.delete(`/wishlist/items/${itemId}`);
			dispatch(showToast({ message: res.data, type: "success" }));
			return itemId;
		} catch (err) {
			dispatch(showToast({ message: err.response?.data, type: "error" }));
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
				state.wishlistItems = state.wishlistItems.filter(
					(item) => item.id !== action.payload
				);
			});
	},
});

export default wishlistSlice.reducer;
