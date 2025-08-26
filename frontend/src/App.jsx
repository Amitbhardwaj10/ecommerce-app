import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { fetchCart } from "./store/features/cart/cartSlice";
import { fetchWishlist } from "./store/features/wishlist/wishlistSlice";
import GlobalLoader from "./components/GlobalLoader";

function App() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?.id);

	useEffect(() => {
		if (userId) {
			dispatch(fetchCart(userId));
		}
	}, [dispatch, userId]);

	useEffect(() => {
		if (userId) {
			dispatch(fetchWishlist({ userId }));
		}
	}, [dispatch, userId]);

	return (
		<>
			<GlobalLoader />
			<Layout />
		</>
	);
}

export default App;
