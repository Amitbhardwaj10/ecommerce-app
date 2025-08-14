import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "../toast/toastSlice";

const initialState = {
	wishlistItems: [],
};

export const fetchWishlist = createAsyncThunk(
	"wishlist/fetchWishlist",
	async (userId, { rejectWithValue }) => {
		try {
			const res = await api.get(`wishlist/${userId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || "Failed to fetch wishlist");
		}
	}
);

export const addToWishlist = createAsyncThunk(
	"wishlist/addToWishlist",
	async ({ userId, productId }, { rejectWithValue, dispatch }) => {
		try {
			const res = await api.post(`wishlist/${userId}/items/${productId}`);
			dispatch(showToast({ message: res.data, type: "success" }));
			return res.data;
		} catch (err) {
			dispatch(
				showToast({
					message: err.response?.data || "Failed to add item into wishlist",
				})
			);
			return rejectWithValue(
				err.response?.data || "Failed to add item into wishlist"
			);
		}
	}
);

export const removeFromWishtlist = createAsyncThunk(
	"wishlist/removeFromWishlist",
	async (itemId, { dispatch, rejectWithValue }) => {
		console.log("item removed from wishlist");
		try {
			const res = await api.delete(`wishlist/items/${itemId}`);
			dispatch(showToast({ message: res.data, type: "success" }));
			return itemId;
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
				const exists = state.wishlistItems.find(
					(item) => item.id == action.payload.id
				);
				!exists && state.wishlistItems.push(action.payload);
			})
			.addCase(removeFromWishtlist.fulfilled, (state, action) => {
				state.wishlistItems = state.wishlistItems.filter(
					(item) => item.id !== action.payload
				);
			});
	},
});

export default wishlistSlice.reducer;
