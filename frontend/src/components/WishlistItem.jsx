import React from "react";
import { HiXMark } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/features/wishlist/wishlistSlice";
import { addToCart } from "../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../store/features/toast/toastSlice";

function WishlistItem({ item }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.user?.id);
	const priceInInr = formatCurrencyInr(item.price);

	const navigateToProductDetails = () => {
		navigate(`/products/${item.productId}/product-details`);
	};

	const handleRemove = () => {
		dispatch(removeFromWishlist({ itemId: item.id }))
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
	};

	return (
		<>
			<div className="relative border bg-white hover:text-sky-700 text-gray-700 cursor-pointer max-w-60 max-h-[425px]">
				<HiXMark
					onClick={handleRemove}
					className="absolute top-2 right-2 z-[1] w-6 h-6 bg-gray-200 rounded-full p-1"
				/>
				<img
					alt="image not found"
					src={item.image}
					className="aspect-square sm:min-h-64 w-full mix-blend-darken object-cover object-center group-hover:opacity-75 xl:aspect-7/8"
					onClick={navigateToProductDetails}
				/>
				<h3
					className="mt-3 text-xs sm:text-sm line-clamp-1 px-3"
					onClick={navigateToProductDetails}
				>
					{item.productTitle}
				</h3>
				<p className="mt-1 text-sm md:text-lg font-medium text-gray-900 px-3">
					{priceInInr}
				</p>
				<button
					className="border-t text-teal-800 py-3 mt-2 text-sm font-semibold text-center mx-auto w-full"
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
