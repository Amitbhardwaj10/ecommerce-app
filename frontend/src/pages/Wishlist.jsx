import React from "react";
import { useSelector } from "react-redux";
import WishlistItem from "../components/WishlistItem";

function Wishlist() {
	const { wishlistItems } = useSelector((state) => state.wishlist);
	return (
		<div className="mx-auto xl:max-w-7xl">
			<div>
				<h2 className="my-10 inline-block w-fit text-2xl text-neutral-700 font-semibold">
					My Wishlist
				</h2>
				<span className="mx-2">{`${items.length} items`}</span>
			</div>
			<div className="grid my-11 grid-cols-2 gap-x-1 sm:gap-x-4 gap-y-1 sm:gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{wishlistItems.map((item) => {
					<WishlistItem key={item.id} item={item} />;
				})}
			</div>
		</div>
	);
}

export default Wishlist;
