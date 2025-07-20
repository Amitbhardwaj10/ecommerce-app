import React from "react";
import Products from "./Products";
import FilterBox from "../components/FilterBox";

function Home() {
	return (
		<>
			<div className="">
				{/* <div className="w-80 hidden lg:block bg-slate-400">
					<FilterBox />
				</div> */}

				<div className="w-full">
					<Products />
				</div>
			</div>
		</>
	);
}

export default Home;
