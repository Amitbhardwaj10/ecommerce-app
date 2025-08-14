import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addToWishlist,
	removeFromWishtlist,
} from "../store/features/wishlist/wishlistSlice";

export default function useWishlistActions(productId) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn, userId } = useSelector((state) => state.auth);
	const { wishlistItems } = useSelector((state) => state.wishlist);
	const inWishlist = wishlistItems.some((item) => item.productId == productId);

	const handleWishlistClick = () => {
		if (!isLoggedIn) {
			navigate("/auth/login");
			return;
		}

		if (!inWishlist) {
			dispatch(addToWishlist({ userId, productId }));
		} else navigate("/wishlist");
	};

	const handleRemoveWishlist = () => {
		dispatch(removeFromWishtlist(productId));
	};

	return { inWishlist, handleWishlistClick, handleRemoveWishlist };
}
