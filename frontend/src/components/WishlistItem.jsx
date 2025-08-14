import React from "react";
import { HiXMark } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishtlist } from "../store/features/wishlist/wishlistSlice";
import { addToCart } from "../store/features/cart/cartSlice";

function WishlistItem({ item }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?.id);
	const priceInInr = formatCurrencyInr(item.price);
	return (
		<>
			<div className="relative border bg-white rounded-md text-center hover:text-sky-700 text-gray-700 cursor-pointer">
				<HiXMark
					onClick={() => dispatch(removeFromWishtlist(item.productId))}
					className="absolute top-2 right-2 w-5 h-5"
				/>
				<img
					alt="image not found"
					src={item.image}
					className="aspect-square w-full rounded-lg mix-blend-darken object-contain object-center group-hover:opacity-75 xl:aspect-7/8"
				/>
				<h3 className="mt-4 text-xs sm:text-sm line-clamp-3 px-3">
					{item.title}
				</h3>
				<p className="mt-1 text-sm md:text-lg font-medium text-gray-900 px-3">
					{priceInInr}
				</p>
				<button
					className="border-t text-teal-800 py-3 mt-2 font-semibold text-center mx-auto w-full"
					onClick={() =>
						dispatch(
							addToCart({ userId, productId: item.productId, quantity: 1 }),
							dispatch(removeFromWishtlist(item.productId))
						)
					}
				>
					MOVE TO CART
				</button>
			</div>
		</>
	);
}

export default WishlistItem;
