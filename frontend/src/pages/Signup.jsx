import React from "react";
import { Link } from "react-router-dom";

function Signup() {
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
					<Link
						to={"/"}
						className="text-2xl text-primary font-bold stylish-line-after stylish-line"
					>
						Quick Shop
					</Link>
					<h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900 ">
						Create New Account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action="/" method="POST" className="space-y-6">
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="fullname"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Full Name
								</label>
							</div>
							<div className="mt-2">
								<input
									id="fullname"
									name="fullname"
									type="text"
									required
									autoComplete="given-name"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-neutral-300 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-800 sm:text-sm/6"
								/>
							</div>
						</div>

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
									pattern="[A-Za-z0-9@]{3,16}"
									title="Username can contain letters, numbers and be 3-16 characters long."
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
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
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
								Sign Up
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Already a member?{" "}
						<Link
							to="/login"
							className="font-semibold text-primary hover:text-teal-700"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Signup;
