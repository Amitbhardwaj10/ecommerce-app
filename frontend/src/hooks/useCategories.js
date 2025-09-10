import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import {
	startLoading,
	stopLoading,
} from "../store/features/loading/loadingSlice";

let cache = null;
let pending = null;

export default function useCategories() {
	const [categories, setCategories] = useState(cache || []);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cache) return;

		if (!pending) {
			dispatch(startLoading());
			pending = api
				.get("/categories")
				.then((res) => (cache = res.data))
				.catch((err) => {
					throw err;
				})
				.finally(() => {
					pending = null;
					dispatch(stopLoading());
				});
		}

		pending
			.then((data) => setCategories(data))
			.catch((err) => {
				throw err;
			});
	}, []);

	return { categories };
}
