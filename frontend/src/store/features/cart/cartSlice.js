import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { showToast } from "../toast/toastSlice";
import { startLoading, stopLoading } from "../loading/loadingSlice";

const initialState = {
	cartItems: [],
};

export const fetchCart = createAsyncThunk(
	"cart/fetchCart",
	async (userId, { dispatch, rejectWithValue }) => {
		dispatch(startLoading());
		try {
			const res = await api.get(`cart/${userId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || "Failed to fetch cart");
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ userId, productId }, { rejectWithValue, dispatch }) => {
		dispatch(startLoading());
		try {
			const res = await api.post(`/cart/${userId}/items`, {
				productId,
			});
			dispatch(showToast({ message: "Added to cart", type: "success" }));
			return res.data;
		} catch (error) {
			dispatch(showToast({ message: err, type: "error" }));
			return rejectWithValue(error.response.data);
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	"cart/updateQuantity",
	async ({ cartItemId, quantity, oldQuantity }, { dispatch }) => {
		dispatch(startLoading());
		try {
			await api.put(`/cart/items/${cartItemId}`, { quantity });
			return { cartItemId, quantity }; // success
		} catch (err) {
			// Rollback quantity in Redux state
			dispatch(quantityChange({ id: cartItemId, quantity: oldQuantity }));

			// Show error toast
			dispatch(
				showToast({
					message: err.response?.data.error || "Failed to update quantity",
					type: "error",
				})
			);
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/deleteFromCart",
	async ({ cartItemId }, { dispatch, rejectWithValue }) => {
		dispatch(startLoading());
		try {
			const res = await api.delete(`cart/items/${cartItemId}`);
			return { cartItemId, message: res.data };
		} catch (err) {
			return rejectWithValue(err.response?.data);
		} finally {
			dispatch(stopLoading());
		}
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.cartItems = action.payload;
			})

			.addCase(addToCart.pending, (state) => {
				state.loading = true;
			})

			.addCase(addToCart.fulfilled, (state, action) => {
				state.loading = false;
				const newItem = action.payload;
				const exists = state.cartItems.find((item) => item.id == newItem.id);

				!exists && state.cartItems.push(newItem);
			})

			.addCase(addToCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
				const { cartItemId, quantity } = action.payload;
				const item = state.cartItems.find((it) => it.id === cartItemId);
				if (item) item.quantity = quantity;
			})

			.addCase(removeFromCart.fulfilled, (state, action) => {
				const { cartItemId } = action.payload;
				state.cartItems = state.cartItems.filter((it) => it.id !== cartItemId);
			});
	},

	reducers: {
		quantityChange: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.cartItems.find((item) => item.id === id);
			if (item) {
				item.quantity = quantity;
			}
		},

		clearCart: (state) => {
			state.cartItems = [];
			// state.totalPrice = 0;
		},
	},
});

export const { quantityChange, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
