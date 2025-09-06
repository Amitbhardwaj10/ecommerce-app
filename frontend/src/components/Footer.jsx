import React from "react";
import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../store/features/filters/filterSlice";

function Footer() {
	const { categories } = useCategories();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<footer className="bg-gray-900 text-gray-300 py-10 mt-10">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{/* Brand */}
				<div className="mb-6 sm:mb-0">
					<h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
						TechStore
					</h2>
					<p className="text-sm sm:text-base">
						Your one-stop shop for peripherals, computer components, and the
						latest gadgets.
					</p>
				</div>

				{/* Dynamic Categories */}
				<div>
					<h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
						Categories
					</h3>
					<ul className="space-y-2 text-sm sm:text-base">
						{categories?.map((cat, idx) => (
							<li key={idx}>
								<button
									className="hover:text-white transition text-left w-full"
									onClick={() => {
										dispatch(setCategory([cat.category]));
										navigate("/products");
									}}
								>
									{cat.category}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Support */}
				<div>
					<h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
						Support
					</h3>
					<ul className="space-y-2 text-sm sm:text-base">
						<li>
							<a href="#" className="hover:text-white transition">
								Help Center
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white transition">
								Warranty
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white transition">
								Returns
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white transition">
								Shipping Info
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-white transition">
								Contact Us
							</a>
						</li>
					</ul>
				</div>

				{/* Social */}
				<div>
					<h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
						Follow Us
					</h3>
					<div className="flex space-x-4 text-sm sm:text-base">
						<a
							href="https://www.linkedin.com/in/amitbhardwaj0/"
							target="_blank"
							className="hover:text-white transition"
						>
							LinkedIn
						</a>
						<a
							href="https://x.com/Amit_bhardwaj0"
							target="_blank"
							className="hover:text-white transition"
						>
							Twitter
						</a>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm sm:text-base text-gray-500">
				© {new Date().getFullYear()} TechStore. All rights reserved.
			</div>
		</footer>
	);
}

export default Footer;
