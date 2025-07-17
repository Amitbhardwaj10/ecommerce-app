import React from "react";
import Products from "./Products";
import FilterBox from "../components/FilterBox";

function Home() {
	return (
		<>
			<main className="p-4">
				<div className="flex gap-1">
					<div className="w-80 hidden lg:block bg-slate-400">
						<FilterBox />
					</div>

					<div className="w-full bg-orange-500">
						<Products />
					</div>
				</div>
			</main>
		</>
	);
}

export default Home;
