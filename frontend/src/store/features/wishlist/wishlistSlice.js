import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { startLoading, stopLoading } from "../loading/loadingSlice";

const initialState = {
	wishlistItems: [],
};

export const fetchWishlist = createAsyncThunk(
	"wishlist/fetchWishlist",
	async ({ userId }, { dispatch, rejectWithValue }) => {
		dispatch(startLoading());
		try {
			const res = await api.get(`/wishlist/${userId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || "Failed to fetch wishlist");
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const addToWishlist = createAsyncThunk(
	"wishlist/addToWishlist",
	async ({ userId, productId }, { dispatch, rejectWithValue }) => {
		dispatch(startLoading());
		try {
			const res = await api.post(`/wishlist/${userId}/items`, { productId });
			return res.data;
		} catch (err) {
			return rejectWithValue(
				err.response?.data || "Failed to add item into wishlist"
			);
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const removeFromWishlist = createAsyncThunk(
	"wishlist/removeFromWishlist",
	async ({ itemId }, { dispatch, rejectWithValue }) => {
		dispatch(startLoading());
		try {
			const res = await api.delete(`/wishlist/items/${itemId}`);
			return { itemId, message: res.data };
		} catch (err) {
			return rejectWithValue(err.response?.data);
		} finally {
			dispatch(stopLoading());
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
