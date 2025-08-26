import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import {
	startLoading,
	stopLoading,
} from "../store/features/loading/loadingSlice";

function Products() {
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();

	const fetchProducts = async () => {
		dispatch(startLoading());
		try {
			const res = await api.get("/products");
			setProducts(res.data);
		} catch (error) {
			console.log("while fetching all products: ", error);
		} finally {
			dispatch(stopLoading());
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<div className="mx-auto pt-5 pb-16 xl:max-w-7xl">
				{/* <h2 className="my-10 mx-auto w-fit text-3xl font-medium text-center stylish-line-after stylish-line">
					PRODUCTS
				</h2> */}
				<div className="grid grid-cols-2 gap-x-1 sm:gap-x-4 gap-y-1 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
