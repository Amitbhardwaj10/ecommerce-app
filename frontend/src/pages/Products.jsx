import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";

function Products() {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const res = await api.get("/products");
			setProducts(res.data);
		} catch (error) {
			console.log("while fetching all products: ", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<div className="mx-auto xl:max-w-7xl">
				<h2 className="my-10 mx-auto w-fit text-3xl font-medium text-center px-2 border-b-[1.3px] leading-[3px] after:border-t-[1.3px] after:bottom-[5px] h-[17px] after:absolute after:-right-[15px] after:-rotate-45 after:w-[17px] relative border-black after:border-black">
					PRODUCTS
				</h2>
				<div className="grid my-11 grid-cols-2 gap-x-1 sm:gap-x-4 gap-y-1 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
					{products.map((product) => {
						return (
							<ProductCard
								key={product.productId}
								productId={product.productId}
								productTitle={product.title}
								productImage={product.image}
								productPrice={product.price}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Products;
