function Sidebar() {
	const sidebarItems = ["Men", "Women", "jewelery", "electronics"];
	return (
		<>
			<aside className="side-bar w-3/6 bg-neutral-800 h-svh absolute top-0 left-0">
				<div className="menuItems">
					<ul className="px-4 py-3 flex flex-col">
						{sidebarItems.map((item, index) => {
							return (
								<a key={index} href={item.toLowerCase()}>
									<li className="text-gray-500 font-medium">{item}</li>
								</a>
							);
						})}
					</ul>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
