import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "products/category/:slug", element: <CategoryPage /> },
			{
				path: "products/:productId/product-details",
				element: <ProductDetails />,
			},
			{ path: "/auth/login", element: <Login /> },
			{ path: "/auth/signup", element: <Signup /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
