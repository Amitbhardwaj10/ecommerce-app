import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "products", element: <Products /> },
			{ path: "products/category/:categoryId", element: <CategoryPage /> },
			{ path: "product-details", element: <ProductDetails /> },
			{ path: "login", element: <Login /> },
			{ path: "signup", element: <Signup /> },
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
