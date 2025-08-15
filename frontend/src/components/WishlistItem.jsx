import React from "react";
import { HiXMark } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/features/wishlist/wishlistSlice";
import { addToCart } from "../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function WishlistItem({ item }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.user?.id);
	const priceInInr = formatCurrencyInr(item.price);

	const navigateToProductDetails = () => {
		navigate(`/products/${item.productId}/product-details`);
	};
	return (
		<>
			<div className="relative border bg-white rounded-md hover:text-sky-700 text-gray-700 cursor-pointer">
				<HiXMark
					onClick={() => dispatch(removeFromWishlist({ itemId: item.id }))}
					className="absolute top-2 right-2 z-[1] w-6 h-6 bg-gray-200 rounded-full p-1"
				/>
				<img
					alt="image not found"
					src={item.image}
					className="aspect-square sm:min-h-64 w-full rounded-lg mix-blend-darken object-contain object-center group-hover:opacity-75 xl:aspect-7/8"
					onClick={navigateToProductDetails}
				/>
				<h3
					className="mt-3 text-xs sm:text-sm line-clamp-2 px-3"
					onClick={navigateToProductDetails}
				>
					{item.productTitle}
				</h3>
				<p className="mt-1 text-sm md:text-lg font-medium text-gray-900 px-3">
					{priceInInr}
				</p>
				<button
					className="border-t text-teal-800 py-3 mt-2 font-semibold text-center mx-auto w-full"
					onClick={() => {
						dispatch(addToCart({ userId, productId: item.productId }));
						dispatch(removeFromWishlist({ itemId: item.id }));
					}}
				>
					MOVE TO CART
				</button>
			</div>
		</>
	);
}

export default WishlistItem;
