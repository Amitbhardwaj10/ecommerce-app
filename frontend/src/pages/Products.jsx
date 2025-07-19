import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

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
			<h2 className="my-4 text-2xl font-bold">Products</h2>
			<div className="max-w-2xl lg:max-w-7xl ">
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => {
						return (
							<Link key={product.productId} className="group">
								<ProductCard
									productTitle={product.title}
									productImage={product.image}
									productPrice={`$${product.price}`}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Products;
