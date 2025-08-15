import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addToWishlist,
	removeFromWishlist,
} from "../store/features/wishlist/wishlistSlice";

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
			dispatch(addToWishlist({ userId, productId }));
		}
	};

	const handleRemoveWishlist = () => {
		dispatch(removeFromWishlist(productId));
	};

	return { inWishlist, handleRemoveWishlist, handleWishlistClick };
}
