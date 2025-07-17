import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

function CategoryPage() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await api.get(`/products/category/${categoryId}`);
				setProducts(res.data);
				console.log(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categoryId]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Products in {categoryId}</h2>

			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{products.map((product, index) => (
						<div key={index} className="border p-2">
							<img src={product.image} alt={product.name} />
							<h3 className="font-semibold">{product.name}</h3>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CategoryPage;
