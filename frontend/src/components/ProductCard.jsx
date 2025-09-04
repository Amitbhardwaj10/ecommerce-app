import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import useWishlistToggle from "../hooks/useWishlistToggle";

function ProductCard({ productId, title, brand, color, price, image }) {
	const priceInInr = formatCurrencyInr(price);
	const navigate = useNavigate();
	const { inWishlist, handleToggleWishlist } = useWishlistToggle(productId);

	const navigateToProductDetails = () => {
		navigate(`/products/${productId}/product-details`);
	};

	return (
		<>
			<Link
				key={productId}
				className="relative transition-shadow bg-white ease-in hover:shadow-lg hover:shadow-neutral-300 rounded-md [&>div>h3]:hover:text-sky-700"
			>
				<div>
					<img
						onClick={navigateToProductDetails}
						alt="image not found"
						src={image}
						className="aspect-square w-full rounded-t-lg object-cover object-center group-hover:opacity-75 xl:aspect-[4/3]"
					/>
				</div>

				<div className="p-2">
					<h2 className="text-slate-800 font-semibold line-clamp-1">{brand}</h2>

					<h3
						className="mb-1 text-xs sm:text-sm line-clamp-1 text-gray-800"
						onClick={navigateToProductDetails}
					>
						{title}
					</h3>

					<small className="text-slate-500">{color}</small>

					<p className="text-sm md:text-lg font-medium text-gray-900">
						{priceInInr}
					</p>
				</div>

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
