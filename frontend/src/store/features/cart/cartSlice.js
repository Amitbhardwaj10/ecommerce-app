import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api/api";

const initialState = {
	cartItems: [],
	loading: false,
	error: null,
};

export const fetchCart = createAsyncThunk(
	"cart/fetchCart",
	async (userId, { rejectWithValue }) => {
		try {
			const res = await api.get(`cart/${userId}`);
			console.log(res.data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data || "Failed to fetch cart");
		}
	}
);

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ userId, productId, quantity }, { rejectWithValue }) => {
		try {
			const res = await api.post(`/cart/${userId}/items`, {
				productId,
				quantity,
			});

			console.log(res);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const checkProductInCart = createAsyncThunk(
	"cart/checkProductInCart",
	async ({ userId, productId }) => {
		const res = await axios.get(
			`/api/cart/${userId}/items/${productId}/exists`
		);
		return res.data; // { exists: true/false }
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState,

	extraReducers: (builder) => {
		builder.addCase(fetchCart.fulfilled, (state, action) => {
			state.cartItems = action.payload;
		});

		builder
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
			});
	},

	reducers: {
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

		clearCart: (state) => {
			state.cartItems = [];
			// state.totalPrice = 0;
		},
	},
});

export const { removeFromCart, quantityChange, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
