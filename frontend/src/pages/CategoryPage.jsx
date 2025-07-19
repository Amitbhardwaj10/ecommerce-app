import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProductsByCategory = async () => {
		try {
			const res = await api.get(`/products/category/${categoryId}`);
			setProducts(res.data);
		} catch (err) {
			console.error("while fetching products by category: ", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProductsByCategory();
	}, [categoryId]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">{products[0]?.categoryName}</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
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
			)}
		</div>
	);
}

export default CategoryPage;
