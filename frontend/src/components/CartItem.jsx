import { useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
	quantityChange,
	removeFromCart,
} from "../store/features/cart/cartSlice";

function CartItem({ item }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const inrPrice = formatCurrencyInr(item.price * item.quantity);

	return (
		<div className="flex items-start gap-4 py-2 lg:py-7 border-b last:border-b-0 relative">
			<div>
				<img
					src={item.image}
					alt={item.title}
					className="w-24 md:w-28 h-32 md:h-38 object-contain mix-blend-darken rounded hover:cursor-pointer"
					onClick={() => navigate(`/products/${item.id}/product-details`)}
				/>
			</div>

			<div className="flex-1 text-xs sm:text-base">
				<h4
					className="line-clamp-2 hover:cursor-pointer hover:text-primary w-full max-w-xl"
					onClick={() => navigate(`/products/${item.id}/product-details`)}
				>
					{item.title}
				</h4>

				<div className="flex flex-wrap gap-2 text-gray-600">
					{item.status && (
						<span
							className={`${
								item.status.toLowerCase().includes("stock")
									? item.status.toLowerCase() === "in stock"
										? "text-green-600"
										: "text-red-600"
									: "text-gray-500"
							} text-green-600 font-medium text-sm`}
						>
							In stock
						</span>
					)}
				</div>

				<div className="my-2">
					<span className="font-semibold text-sm md:text-lg text-gray-800">
						{inrPrice}
					</span>
				</div>

				<div className="flex flex-col md:flex-row md:items-center mt-3 gap-2">
					<div>
						<button
							className={`text-lg px-2 rounded bg-gray-200 ${
								item.quantity > 1 && "bg-secondary text-white"
							}`}
							onClick={() =>
								dispatch(
									quantityChange({
										id: item.id,
										quantity: Math.max(1, item.quantity - 1),
									})
								)
							}
						>
							-
						</button>
						<span className="w-8 mx-2 text-center font-medium">
							{item.quantity}
						</span>
						<button
							className="text-lg px-2 rounded bg-secondary text-white"
							onClick={() =>
								dispatch(
									quantityChange({ id: item.id, quantity: item.quantity + 1 })
								)
							}
						>
							+
						</button>
					</div>
					<div className="flex gap-2 text-xs md:text-sm">
						<button
							className="flex items-center gap-1 hover:text-primary hover:underline underline-offset-2"
							onClick={() => onWishlist(item.id)}
						>
							<HiOutlineHeart className="w-4" />
							<span>Add to Wishlist</span>
						</button>

						<button
							className="flex items-center gap-1 text-gray-700 hover:text-red-800"
							onClick={() => dispatch(removeFromCart({ id: item.id }))}
						>
							<HiTrash className="w-4" />
							<span>Delete</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
