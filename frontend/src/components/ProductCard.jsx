import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import useWishlistActions from "../hooks/useWishlistActions";

function ProductCard({ productId, productTitle, productPrice, productImage }) {
	const priceInInr = formatCurrencyInr(productPrice);
	const navigate = useNavigate();
	const { inWishlist, handleWishlistClick, handleRemoveWishlist } =
		useWishlistActions(productId);

	const navigateToProductDetails = () => {
		navigate(`/products/${productId}/product-details`);
	};

	return (
		<>
			<Link
				key={productId}
				className="relative transition-shadow bg-white ease-in hover:shadow-lg hover:shadow-neutral-300 rounded-md py-2 px-3 hover:text-sky-700 text-gray-700"
			>
				<img
					onClick={navigateToProductDetails}
					alt="image not found"
					src={productImage}
					className="aspect-square w-full rounded-lg mix-blend-darken object-contain object-center group-hover:opacity-75 xl:aspect-7/8"
				/>
				<h3
					className="mt-4 text-xs sm:text-sm line-clamp-3"
					onClick={navigateToProductDetails}
				>
					{productTitle}
				</h3>
				<p className="mt-1 text-sm md:text-lg font-medium text-gray-900">
					{priceInInr}
				</p>

				<HiOutlineHeart
					className={`absolute top-2 right-2 w-5 h-5 ${
						inWishlist
							? "fill-rose-700 text-rose-700"
							: "hover:fill-rose-700 hover:text-rose-700"
					}`}
					onClick={inWishlist ? handleRemoveWishlist : handleWishlistClick}
				/>
			</Link>
		</>
	);
}

export default ProductCard;
