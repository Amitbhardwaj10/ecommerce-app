import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import useWishlistToggle from "../hooks/useWishlistToggle";

function ProductCard({ productId, productTitle, productPrice, productImage }) {
	const priceInInr = formatCurrencyInr(productPrice);
	const navigate = useNavigate();
	const { inWishlist, handleToggleWishlist } = useWishlistToggle(productId);

	const navigateToProductDetails = () => {
		navigate(`/products/${productId}/product-details`);
	};

	return (
		<>
			<Link
				key={productId}
				className="relative transition-shadow bg-white ease-in hover:shadow-lg hover:shadow-neutral-300 rounded-md hover:text-sky-700 text-gray-700"
			>
				<img
					onClick={navigateToProductDetails}
					alt="image not found"
					src={productImage}
					className="aspect-square w-full rounded-t-lg object-cover object-center group-hover:opacity-75 xl:aspect-7/8"
				/>
				<h3
					className="mt-4 text-xs sm:text-sm text-pretty line-clamp-2 px-2"
					onClick={navigateToProductDetails}
				>
					{productTitle}
				</h3>
				<p className="mt-1 mb-2 text-sm md:text-lg font-medium text-gray-900 px-2">
					{priceInInr}
				</p>

				<button
					onClick={handleToggleWishlist}
					className="absolute top-2 right-2"
				>
					{inWishlist ? (
						<HiHeart className="w-4 h-4 text-rose-500" />
					) : (
						<HiHeart className="w-4 h-4 hover:text-rose-500 text-gray-300" />
					)}
				</button>
			</Link>
		</>
	);
}

export default ProductCard;
