import bcryptjs from "bcryptjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../context/authContext";

const Login = () => {
	const { setIsAuthenticated, setLoggedInUser } = useAuth();
	useEffect(() => {
		document.title = "Login Page";
	}, []);
	const navigate = useNavigate();
	const [errorState, setErrorState] = useState(null);
	const validationSchema = yup.object({
		username: yup.string().required("username is required"),
		password: yup.string().required("password is required"),
	});

	const handleLogin = async (values, { setSubmitting }) => {
		setSubmitting(true);
		const existingUser = JSON.parse(localStorage.getItem("users")) || [];

		const foundUser = existingUser.find(
			(user) => user.username === values.username
		);
		if (!foundUser) {
			setErrorState("username or password incorrect");
			setSubmitting(false);
			return;
		}

		const passwordMatch = await bcryptjs.compare(
			values.password,
			foundUser.password
		);
		if (!passwordMatch) {
			setErrorState("username or password incorrect");
			setSubmitting(false);
			return;
		}
		setIsAuthenticated(true);
		localStorage.setItem("auth", "true");
		setLoggedInUser(values.username);
		localStorage.setItem("loggedInUser", values.username);
		setSubmitting(false);
		navigate("/");
	};
	return (
		<div className="w-full h-screen bg-gray-500 flex justify-center items-center py-12">
			<Formik
				initialValues={{ username: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={handleLogin}
			>
				{({ isSubmitting }) => (
					<Form className="w-96 bg-gray-100 rounded-md px-4 py-3">
						<h1 className="text-2xl font-semibold mb-4 ">Login</h1>

						{errorState && (
							<p className="text-red-500 text-center">{errorState}</p>
						)}
						<div className="mb-4 flex flex-col">
							<label htmlFor="username">Username</label>
							<Field
								name="username"
								type="text"
								className="px-3 py-2 focus:outline-none rounded-md border border-gray-300"
								placeholder="Enter Username"
								disabled={isSubmitting}
							/>
							<ErrorMessage
								name="username"
								component="div"
								className="text-red-500"
							/>
						</div>
						<div className="mb-4 flex flex-col">
							<label htmlFor="password">Password</label>
							<Field
								name="password"
								type="password"
								className="px-3 py-2 focus:outline-none rounded-md border border-gray-300"
								placeholder="Enter Password"
								disabled={isSubmitting}
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="text-red-500"
							/>
						</div>

						<button
							type="submit"
							className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Loading..." : "Login"}
						</button>
						<p>
							Don't have account?{" "}
							<Link to="/register" className="text-blue-400">
								register here
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
