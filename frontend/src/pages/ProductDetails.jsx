import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/features/cart/cartSlice";
import useWishlistActions from "../hooks/useWishlistActions";

function ProductDetails() {
	const imagesUrl = [
		"https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",

		"https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",

		"https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",

		"https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
	];

	const userId = useSelector((state) => state.auth.user?.id);
	const [selectedImage, setSelectedImage] = useState(imagesUrl[0]);
	let { productId } = useParams();
	const [product, setProduct] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector((state) => state.auth);
	const cartItems = useSelector((state) => state.cart.cartItems);
	productId = Number(productId);
	const { inWishlist, handleWishlistClick } = useWishlistActions(productId);
	const inCart = cartItems.some((item) => item.productId == productId);

	const getProdcutByProductId = async () => {
		try {
			const res = await api.get(`/products/${productId}`);
			setProduct(res.data);
		} catch (error) {
			console.log("while fetching the product By id: ", error);
		}
	};

	async function handleAddToCart() {
		if (!isLoggedIn) {
			navigate("/auth/login");
			return;
		}

		if (!inCart) {
			dispatch(addToCart({ userId, productId }));
		} else {
			navigate("/checkout/cart");
		}
	}

	useEffect(() => {
		getProdcutByProductId();
	}, [productId]);

	const priceInInr = formatCurrencyInr(product.price);

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-wrap -mx-4">
					<div className="w-full md:w-1/2 px-4 mb-8">
						<img
							src={product.image}
							alt="Product"
							className="w-full h-96 object-contain rounded-lg shadow-md mb-4"
							id="mainImage"
						/>
						<div className="flex gap-4 py-4 justify-center overflow-x-auto">
							{imagesUrl.map((url, index) => (
								<img
									key={index}
									src={url}
									alt="image not found!"
									className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer transition duration-300 ${
										selectedImage === url
											? "opacity-100"
											: "opacity-60 hover:opacity-100"
									}`}
									onClick={() => setSelectedImage(url)}
								/>
							))}
						</div>
					</div>

					<div className="w-full md:w-1/2 px-4">
						<h3 className="text-xl mb-2">{product.title}</h3>
						<div className="mb-4">
							<span className="text-2xl font-bold mr-2">{priceInInr}</span>
							<span className="text-gray-500 line-through">₹1,99,000</span>
						</div>
						<div className="flex items-center mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 text-yellow-500"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 text-yellow-500"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 text-yellow-500"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 text-yellow-500"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 text-yellow-500"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Description:</h3>
							<p className="text-gray-700 mb-6">{product.description}</p>
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold mb-2">Color:</h3>
							<div className="flex space-x-2">
								<button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
								<button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
								<button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
							</div>
						</div>

						<div className="flex space-x-4 mb-6">
							<button
								className="bg-primary flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2"
								onClick={handleAddToCart}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
									/>
								</svg>
								{inCart ? "Go to cart" : "Add to cart"}
							</button>
							<button
								className={`bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
									inWishlist
										? "bg-primary text-white hover:bg cursor-auto"
										: "hover:bg-gray-300"
								}`}
								onClick={handleWishlistClick}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className={`size-6 ${
										inWishlist && "fill-rose-600 text-rose-600"
									}`}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
									/>
								</svg>
								{inWishlist ? "Wishlisted" : "Wishlist"}
							</button>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Key Features:</h3>
							<ul className="list-disc list-inside text-gray-700">
								<li>Industry-leading noise cancellation</li>
								<li>30-hour battery life</li>
								<li>Touch sensor controls</li>
								<li>Speak-to-chat technology</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
