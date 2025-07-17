import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useCategories() {
	// Fetching categories from backend
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const resp = await api.get("/categories");
				setCategories(resp.data);
			} catch (error) {
				console.log("While fetching categories: ", error);
			}
		};

		fetchCategories();
	}, []);

	return { categories };
}
