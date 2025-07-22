import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
	const { slug } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProductsByCategory = async () => {
		try {
			const res = await api.get(`/products/category/${slug}`);
			setProducts(res.data);
		} catch (err) {
			console.error("while fetching products by category: ", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProductsByCategory();
	}, [slug]);

	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="mx-auto xl:max-w-7xl ">
					<h2 className="my-10 mx-auto w-fit text-3xl font-medium text-center stylish-line-after stylish-line">
						{products[0]?.categoryName.toUpperCase()}
					</h2>
					<div className="grid my-11 grid-cols-2 gap-x-1 sm:gap-x-4 gap-y-2 sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
			)}
		</div>
	);
}

export default CategoryPage;
