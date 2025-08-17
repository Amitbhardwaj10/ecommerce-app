import React from "react";
import Products from "./Products";
import SearchBar from "../components/subComponents/SearchBar";

function Home() {
	return (
		<>
			<div className="w-full">
				<div className="md:hidden sticky top-0 place-items-center h-16 w-full rounded-lg flex justify-center px-2">
					{<SearchBar />}
				</div>

				<Products />
			</div>
		</>
	);
}

export default Home;
