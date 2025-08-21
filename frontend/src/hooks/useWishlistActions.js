import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../store/features/wishlist/wishlistSlice";
import { showToast } from "../store/features/toast/toastSlice";

export default function useWishlistActions(productId) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn } = useSelector((state) => state.auth);
	const userId = useSelector((state) => state.auth.user?.id);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const inWishlist = wishlistItems.some((item) => item.productId == productId);

	const handleWishlistClick = () => {
		if (!isLoggedIn) {
			navigate("/auth/login");
			return;
		}

		if (!inWishlist) {
			dispatch(addToWishlist({ userId, productId }))
				.unwrap()
				.then(() => {
					dispatch(
						showToast({ message: "item added to wishlist", type: "success" })
					);
				})
				.catch((err) => {
					dispatch(showToast({ message: err, type: "error" }));
				});
		}
	};

	return { inWishlist, handleWishlistClick };
}
