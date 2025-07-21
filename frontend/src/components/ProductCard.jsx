import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ productId, productTitle, productPrice, productImage }) {
	let formatter = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	});

	const priceInInr = formatter.format(productPrice);

	return (
		<>
			<Link
				to={`/products/${productId}/product-details`}
				key={productId}
				className="transition-shadow bg-white ease-in hover:shadow-lg hover:shadow-neutral-300 rounded-md py-2 px-3  hover:text-sky-700 text-gray-700"
			>
				<img
					alt="image not found"
					src={productImage}
					className="aspect-square w-full rounded-lg mix-blend-darken object-contain object-center group-hover:opacity-75 xl:aspect-7/8"
				/>
				<h3 className="mt-4 text-xs sm:text-sm">
					{productTitle.length > 140
						? productTitle.slice(0, 141) + "..."
						: productTitle}
				</h3>
				<p className="mt-1 text-sm md:text-lg font-medium text-gray-900">
					{priceInInr}
				</p>
			</Link>
		</>
	);
}

export default ProductCard;
