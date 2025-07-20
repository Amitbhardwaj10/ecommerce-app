import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

// take props to put dynamic height and width of search bar
function SearchBar() {
	return (
		<>
			<div className="w-full md:w-80 lg:max-w-60 xl:max-w-96  relative rounded-lg">
				<a href="/">
					<HiMagnifyingGlass className="w-5 h-5 absolute left-2 top-[.7rem] text-neutral-500" />
				</a>

				<input
					type="search"
					id=""
					placeholder="Search for products brands and more"
					className="w-full text-ellipsis bg-[#f0f0f0] outline-none placeholder:text-neutral-500 text-neutral-500 pl-10 px-4 placeholder:text-[.9rem] py-[.45rem] rounded-md border border-gray-300 shadow-md"
				/>
			</div>
		</>
	);
}

export default SearchBar;
