import React from "react";

function ProductCard({ productTitle, productPrice, productImage }) {
	return (
		<>
			<div className="">
				<img
					alt="image not found"
					src={productImage}
					className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
				/>
				<h3 className="mt-4 text-sm text-gray-700">{productTitle}</h3>
				<p className="mt-1 text-lg font-medium text-gray-900">{productPrice}</p>
			</div>
		</>
	);
}

export default ProductCard;
