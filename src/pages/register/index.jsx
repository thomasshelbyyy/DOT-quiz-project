import bcryptjs from "bcryptjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const RegisterPage = () => {
	useEffect(() => {
		document.title = "Register Page";
	}, []);
	const navigate = useNavigate();
	const validationSchema = yup.object({
		username: yup
			.string()
			.required("username is required")
			.min(4, "must be at least 4 characters"),
		password: yup
			.string()
			.required("password is required")
			.min(5, "password must contain at least 5 characters"),
		confirmPassword: yup
			.string()
			.required("password confirm is required")
			.oneOf([yup.ref("password")], "Passwords must match"),
	});

	const initialValues = {
		username: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		setSubmitting(true);
		const existingUser = JSON.parse(localStorage.getItem("users")) || [];
		console.log(existingUser);
		const usernameExist = existingUser.some(
			(user) => user.username === values.username
		);

		if (usernameExist) {
			setErrors({ username: "Username already exist" });
			setSubmitting(false);
			return;
		}

		const newUser = {
			username: values.username,
			password: await bcryptjs.hash(values.password, 10),
		};
		existingUser.push(newUser);

		localStorage.setItem("users", JSON.stringify(existingUser));

		setSubmitting(false);
		navigate("/login");
	};
	return (
		<div className="w-full h-screen bg-gray-500 flex justify-center items-center py-12">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form
						action=""
						className="w-96 h-auto bg-gray-100 rounded-md px-4 py-3"
					>
						<h1 className="text-2xl font-semibold mb-4">Register</h1>

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
							<label htmlFor="username">Password</label>
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
						<div className="mb-4 flex flex-col">
							<label htmlFor="username">Confirm Password</label>
							<Field
								name="confirmPassword"
								type="password"
								className="px-3 py-2 focus:outline-none rounded-md border border-gray-300"
								placeholder="Confirm Password"
								disabled={isSubmitting}
							/>
							<ErrorMessage
								name="confirmPassword"
								component="div"
								className="text-red-500"
							/>
						</div>

						<button
							type="submit"
							className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Registering..." : "Register"}
						</button>
						<p>
							Already have account?{" "}
							<Link to="/login" className="text-blue-400">
								login here
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterPage;
