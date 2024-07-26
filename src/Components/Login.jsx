import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

import SignInWithGoogle from "./SignInWithGoogle";
import { auth } from "../helpers/firebase";

function Login() {
	const navigate = useNavigate();

	const [loginUser, setLoginNewUser] = useState({ password: "", email: "" });

	const handleChange = (e) => {
		setLoginNewUser({ ...loginUser, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = loginUser;

		try {
			const loggedUser = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("User logged in to Firebase Successfully");

			// store the JWT token so that you know the user is logged in.
			const token = await loggedUser.user.getIdToken();
			localStorage.setItem("token", token);

			setLoginNewUser({ password: "", email: "" });
			toast.success("User logged in Successfully", {
				position: "top-center",
			});

			// you do not have to create a login in the backend because firebase is handling it.
			// when you navigate to profile, you will see a fetch for the user.
			navigate(`/profile/${loggedUser.user.uid}`);
		} catch (error) {
			console.log(error.message);

			toast.error(error.message, {
				position: "bottom-center",
			});
		}
	};

	return (
		<div className="form-container">
			<h3 className="form-title">Login</h3>
			<div>
				New user{" "}
				<Link to="/register" className="register-link">
					Register Here
				</Link>
				{/* <p>--Or continue with--</p> */}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label htmlFor="email" className="label-header">
						Email Address:{" "}
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter email"
							value={loginUser.email}
							onChange={handleChange}
						/>
					</label>

					<label htmlFor="password" className="label-header">
						Password:{" "}
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter password"
							value={loginUser.password}
							onChange={handleChange}
						/>
					</label>

					<button type="submit" className="submit-play">
						Submit{" "}
					</button>
				</div>
			</form>

			<SignInWithGoogle />
		</div>
	);
}

export default Login;
