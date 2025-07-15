import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/subComponents/SearchBar";

function App() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);

	return (
		<>
			<Navbar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

			<Sidebar
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
			/>
			<div className="md:hidden sticky bg-[#edf6f9] top-0 place-items-center h-16 w-full rounded-lg flex justify-center px-2">
				{<SearchBar />}
			</div>

			<main className="">
				{/* give the main content some margin from the top */}
				<p>
					Welcome to the main content area! Lorem ipsum dolor, sit amet
					consectetur adipisicing elit. Facere reiciendis iure eligendi
					explicabo consequuntur doloribus eum iste expedita. Doloremque
					incidunt veritatis ad rem molestias sunt aspernatur recusandae placeat
					ex? Culpa necessitatibus, ratione natus similique consequatur labore
					et facere. Debitis exercitationem praesentium consequatur at deserunt.
					Fuga blanditiis ipsam, corporis rerum qui iure numquam sequi fugit
					voluptate amet non dolore voluptatum facilis suscipit quisquam eius
					nobis sapiente. Atque praesentium inventore saepe sit provident porro
					aliquid voluptatem architecto doloribus itaque labore nemo at,
					reiciendis cumque ad deserunt? Molestias consequuntur vero eos
					laudantium necessitatibus. Ratione, tempore expedita! Dolore veniam
					aspernatur illum dolor nobis. Reiciendis asperiores explicabo natus
					obcaecati modi quos a eius libero. Error praesentium quo aperiam
					voluptas expedita explicabo dignissimos assumenda, exercitationem
					dicta eligendi mollitia iure. Id quaerat porro amet maiores dolore et
					quam cum officia atque illum perspiciatis molestiae, pariatur labore
					laudantium aliquid necessitatibus nam veniam vero quod, doloribus
					adipisci. Vitae voluptatibus, rerum commodi iure eos repellat placeat
					tenetur pariatur neque ea tempora veritatis ipsum nemo nobis maiores
					laboriosam sunt assumenda beatae. Vel tempore consequatur dicta iure
					soluta. Ipsa deserunt natus dolore similique velit ducimus architecto
					impedit qui necessitatibus nesciunt veritatis doloribus nemo optio
					commodi, consectetur quos illo voluptatem repellat itaque accusamus
					libero. Deserunt explicabo sit officiis cum aut, quo porro consectetur
					minima numquam iusto blanditiis modi distinctio corrupti harum culpa
					dolorem voluptatibus exercitationem animi sunt fugit sed laudantium.
					Quibusdam, necessitatibus expedita. Veritatis, soluta? Ducimus
					deleniti saepe quam illo? Aliquam vel, blanditiis dolor ab quidem
					obcaecati voluptas nobis cupiditate voluptatum consectetur pariatur
					odit velit doloremque doloribus dolorum earum totam molestias eius
					sint, laboriosam provident a, sed ipsa maiores! Accusamus repellendus
					mollitia dolorem molestias quis, voluptate voluptatibus soluta illo
					quod! Fugit quod harum doloribus illo blanditiis corrupti dicta
					exercitationem a maxime porro nobis, facere nisi quo suscipit sint
					provident rerum aliquam odio. Placeat officia earum tenetur facere
					sequi, aut non quisquam cum doloribus. Asperiores iure dolor libero
					modi aliquam placeat laborum est, fugiat nulla consectetur impedit
					magni architecto molestiae quasi? Ex iusto, cupiditate aliquam
					consequuntur perspiciatis sunt tenetur repudiandae ea doloremque
					inventore eius voluptatem nostrum libero enim expedita, beatae
					repellendus aut blanditiis neque culpa, magnam eligendi hic facilis?
					Dicta rem ipsum hic unde sit iure similique laboriosam earum cum
					reprehenderit, impedit labore distinctio tempora! Nemo, commodi? Qui,
					ullam magni eum iste quam fuga explicabo ad similique architecto
					officia deleniti minima dolore eos tenetur quis a molestias quaerat
					nostrum eius? Corrupti sed nostrum excepturi quisquam neque repellat
					quod atque adipisci amet beatae cum eveniet dolorum labore quasi,
					dignissimos dolores quam mollitia, impedit accusantium minima
					expedita? Ipsum debitis numquam placeat eligendi consequatur! Debitis
					officia nihil ullam hic temporibus nobis incidunt laboriosam.
					Explicabo nostrum, iusto aspernatur odit tempore sapiente distinctio
					in totam animi, nisi veniam. Provident, rem eligendi illum praesentium
					labore ex cum sit adipisci inventore vero assumenda. Quas facilis
					doloremque provident earum vero dolor maxime tempore dolore aliquid
					nisi odio ducimus nulla, eius minima numquam exercitationem? Fuga
					labore rem obcaecati veniam itaque laborum maxime quae a excepturi
					asperiores saepe et eum veritatis, sed animi ducimus!
				</p>
			</main>
		</>
	);
}

export default App;
