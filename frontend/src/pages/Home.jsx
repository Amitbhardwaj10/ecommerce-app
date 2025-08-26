import React from "react";
import Products from "./Products";
import FilterSidebar from "../components/FilterSidebar";

function Home() {
	const filterOptions = {
		categoriesArr: [
			{ label: "T-Shirts", value: "tshirt", count: 20 },
			{ label: "Women-T-Shirts", value: "womenTshirts", count: 44 },
		],
		brandsArr: [{ label: "Nike", value: "nike", count: 8 }],
		colorsArr: [{ label: "Blue", value: "blue", count: 12 }],
		priceRangeArr: [500, 10000],
	};

	return (
		<>
			{/* <div className="md:hidden sticky top-0 h-16 w-full flex justify-center px-2">
					<SearchBar />
				</div> */}

			<div className="p-5 text-sm text-gray-700">HOME / Gadgets</div>

			<div className="w-full flex flex-col md:flex-row border-t gap-x-4 border-collapse">
				<div className="md:w-80 w-full border-r">
					<FilterSidebar filterOptions={filterOptions} />
				</div>

				<div className="lg:w-full w-full border-b border-separate">
					<Products />
				</div>
			</div>
		</>
	);
}

export default Home;
