import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { fetchCart } from "./store/features/cart/cartSlice";

function App() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?.id);

	useEffect(() => {
		if (userId) {
			dispatch(fetchCart(userId));
		}
	}, [dispatch, userId]);

	return (
		<>
			<Layout />
		</>
	);
}

export default App;
