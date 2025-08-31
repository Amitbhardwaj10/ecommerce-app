import React from "react";
import { useSelector } from "react-redux";
import WishlistItem from "../components/WishlistItem";
import wishlistImage from "../assets/wishlist.jpg";
import { useNavigate } from "react-router-dom";

function Wishlist() {
	const navigate = useNavigate();
	const { wishlistItems } = useSelector((state) => state.wishlist);

	return (
		<div className="mx-auto xl:max-w-7xl px-5">
			{wishlistItems.length > 0 && (
				<div>
					<h2 className="mt-10 inline-block w-fit text-2xl text-neutral-700 font-semibold">
						My Wishlist
					</h2>
					<span className="mx-2 text-lg">{`${wishlistItems.length} ${
						wishlistItems.length > 1 ? "items" : "item"
					}`}</span>
				</div>
			)}
			<div className="grid my-11 grid-cols-2 gap-x-1 sm:gap-x-3 gap-y-1 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-16 xl:grid-cols-4 px-auto">
				{wishlistItems.map((item) => (
					<WishlistItem key={item.id} item={item} />
				))}
			</div>
			<div>
				{wishlistItems.length === 0 && (
					<div className="text-center">
						<p className="text-lg md:text-xl text-gray-800 font-semibold">
							YOUR WISHLIST IS EMPTY
						</p>
						<p className="text-gray-400 text-sm sm:text-base my-5 mx-auto max-w-96 text-balance">
							Add items that you like to your wishlist. Review them anytime and
							easily move them to the cart.
						</p>
						<img className="w-44 md:w-64 mx-auto" src={wishlistImage} alt="" />
						<button
							className="text-sky-700 hover:text-sky-800 sm:text-lg border border-sky-700 px-7 py-3 mt-2 font-semibold text-center"
							onClick={() => navigate("/")}
						>
							CONTINUE SHOPPING
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Wishlist;
