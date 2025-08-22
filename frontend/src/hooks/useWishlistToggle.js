import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addToWishlist,
	removeFromWishlist,
} from "../store/features/wishlist/wishlistSlice";
import { showToast } from "../store/features/toast/toastSlice";

export default function useWishlistToggle(productId) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn } = useSelector((state) => state.auth);
	const userId = useSelector((state) => state.auth.user?.id);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const inWishlist = wishlistItems.some((item) => item.productId == productId);

	const handleToggleWishlist = () => {
		if (!isLoggedIn) {
			navigate("/auth/login");
			return;
		}

		if (inWishlist) {
			// find itemId since API needs it
			const itemId = wishlistItems.find(
				(item) => item.productId == productId
			)?.id;

			if (itemId) {
				dispatch(removeFromWishlist({ itemId }))
					.unwrap()
					.then((res) => {
						dispatch(
							showToast({
								message: res.message,
								type: "success",
							})
						);
					})
					.catch((err) => {
						dispatch(showToast({ message: err, type: "error" }));
					});
			}
		} else {
			dispatch(addToWishlist({ userId, productId }))
				.unwrap()
				.then(() => {
					dispatch(
						showToast({ message: "Item added to wishlist", type: "success" })
					);
				})
				.catch((err) => {
					dispatch(showToast({ message: err, type: "error" }));
				});
		}
	};

	return { inWishlist, handleToggleWishlist };
}
