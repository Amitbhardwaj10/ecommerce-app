import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Toast from "../components/subComponents/Toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/auth/authSlice";
import { showToast } from "../store/features/toast/toastSlice";

function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const show = useSelector((state) => state.toast.show);

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", formData);
			setFormData({
				username: "",
				password: "",
			});

			const message = res.data.message || "Login successfully!";

			dispatch(showToast({ message: message, type: "success" }));
			dispatch(login(res.data.user));
			navigate("/");
		} catch (err) {
			let errorMessage = "Something went wrong. Try again.";
			if (err.response) {
				errorMessage = err.response.data.message || "Login failed.";
			} else if (err.request) {
				errorMessage = "No response from server. Try again later.";
			}
			dispatch(showToast({ message: errorMessage, type: "error" }));
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/", { replace: true });
		}
	}, [isLoggedIn]);

	return (
		<>
			{show && <Toast />}

			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
					<Link
						to={"/"}
						className="text-2xl text-primary border-black font-bold stylish-line-after stylish-line"
					>
						Quick Shop
					</Link>
					<h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						action="/"
						method="POST"
						className="space-y-6"
						onSubmit={handleSubmit}
					>
						<div>
							<label
								htmlFor="username"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									pattern="[A-Za-z0-9@]{3,20}"
									title="Username can contain letters, numbers, @ and be 3-20 characters long."
									value={formData.username}
									onChange={handleChange}
									required
									autoComplete="username"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 border border-neutral-300 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-800 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="#"
										className="font-semibold text-primary hover:text-teal-700"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleChange}
									pattern="[A-Za-z0-9@]{6,20}"
									title="Password must be 6-20 characters long, and can not contain special character except @ only"
									required
									autoComplete="current-password"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-neutral-300 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-800 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#004367] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Not a member?{" "}
						<Link
							to="/auth/signup"
							className="font-semibold text-primary hover:text-teal-700"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
