import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useCategories() {
	// Fetching categories from backend
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const res = await api.get("/categories");
			setCategories(res.data);
		} catch (error) {
			console.log("while fetching categories: ", error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return { categories };
}
