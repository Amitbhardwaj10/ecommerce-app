import React, { useState } from "react";
import CartItem from "../components/CartItem";
import cartImage from "../assets/cart.jpg";
import { Link } from "react-router-dom";
import { formatCurrencyInr } from "../utils/formatCurrency";
import { useSelector } from "react-redux";

function Cart() {
	const items = useSelector((state) => state.cart.cartItems);

	// const handleWishlist = (id) => {
	// 	const item = items.find((item) => item.id === id);
	// 	if (item) {
	// 		alert(`"${item.name}" added to wishlist!`);
	// 	}

	const subtotal = items.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0
	);
	const discount = subtotal * 0.2;
	const delivery = 0;
	const tax = 14;
	const total = subtotal - discount + delivery + tax;

	const inrDiscount = formatCurrencyInr(discount);
	const inrDelivery = formatCurrencyInr(delivery);
	const inrTax = formatCurrencyInr(tax);
	const inrTotal = formatCurrencyInr(total);
	const inrSubtotal = formatCurrencyInr(total);

	return (
		<div className="h-full flex items-start justify-center bg-gray-100 py-6 md:p-6">
			<div className="w-full max-w-7xl flex flex-col lg:flex-row gap-5">
				{/* Cart Items */}
				<div className="h-full bg-white shadow rounded-lg flex-1 p-2 md:px-6 py-3">
					<div>
						{items.length === 0 ? (
							<div className="text-center py-16">
								<img className="w-44 md:w-64 mx-auto" src={cartImage} alt="" />
								<p className="text-gray-500 md:text-lg mt-5">
									Your cart is empty.
								</p>
								<Link
									to="/"
									className="text-blue-700 hover:text-blue-800 text-sm"
								>
									Continue Shopping
								</Link>
							</div>
						) : (
							items.map((item) => <CartItem key={item.id} item={item} />)
						)}
					</div>
				</div>
				{/* Cart Summary */}
				<div
					className={`${
						items.length === 0 && "hidden"
					} flex flex-col gap-1 md:gap-3 bg-white rounded-lg w-full lg:w-96 p-6 max-h-fit self-start`}
					id="order-details-box"
				>
					<h3 className="text-lg font-bold mb-2 pt-1 text-[#003049] tracking-wide">
						Order Details
					</h3>
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>{inrSubtotal}</span>
					</div>
					<div className="flex justify-between">
						<span>
							Discount <span className="text-xs text-gray-400">(20%)</span>
						</span>
						<span className="text-green-600">- {inrDiscount}</span>
					</div>
					<div className="flex justify-between">
						<span>Delivery</span>
						<span className="text-gray-500">
							{delivery === 0 ? "Free" : `${inrDelivery}`}
						</span>
					</div>
					<div className="flex justify-between">
						<span>Tax</span>
						<span>+ {inrTax}</span>
					</div>
					<div className="border-t mt-2"></div>
					<div className="flex justify-between text-lg font-bold text-gray-800">
						<span>Total Amount</span>
						<span>{inrTotal}</span>
					</div>
					<div className="w-full grid grid-cols-2 lg:grid-cols-1 shadow-[0_-2px_6px_0_rgba(0,0,0,0.16)] lg:shadow-none bg-white px-4 py-2 fixed bottom-0 left-0 lg:static">
						<div className="visible lg:hidden">
							<span className="font-semibold">{inrTotal}</span>
							<a
								href="#order-details-box"
								className="text-sky-600 font-medium text-sm scroll-smooth block hover:text-sky-600"
							>
								View details
							</a>
						</div>

						<button
							className="px-6 py-2 font-semibold rounded-lg bg-[#003049] text-white shadow md:shadow-non hover:bg-[#002030] transition"
							disabled={items.length === 0}
						>
							Place order
						</button>
					</div>
					{/* <button
						className="w-full mt-2 px-6 py-2 rounded border border-[#003049] text-[#003049] font-semibold hover:bg-[#003049] hover:text-white transition"
						disabled={items.length === 0}
					>
						Continue shopping
					</button> */}
				</div>
			</div>
		</div>
	);
}

export default Cart;
