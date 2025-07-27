import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { Link } from "react-router-dom";

function Dropdown() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	return (
		<div className="absolute top-full right-0 mt-2 w-36 shadow-2xl shadow-gray-700 bg-primary text-[#ffffffde] ring-1 ring-black ring-opacity-5 focus:outline-none z-40 rounded-md">
			{isLoggedIn ? (
				<>
					<p className="px-4 py-2 text-sm text-white font-normal">
						Signed in as {user.email}
					</p>

					<Link
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-b-md"
						onClick={() => dispatch(logout())}
					>
						Sign out
					</Link>
				</>
			) : (
				<>
					<Link
						to="/auth/login"
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-t-md"
					>
						Login
					</Link>
					<Link
						to="/auth/signup"
						className="block px-4 py-2 text-sm hover:text-black hover:bg-slate-300 rounded-b-md"
					>
						Sign Up
					</Link>
				</>
			)}
		</div>
	);
}

export default Dropdown;
