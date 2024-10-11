import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import { AuthProvider } from "./context/authContext";
import AuthRoute from "./routes/authRoute";
import ProtectedRoute from "./routes/protectedRoute";
import HomePage from "./pages/home";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route
						path="/login"
						element={
							<AuthRoute>
								<Login />
							</AuthRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<AuthRoute>
								<RegisterPage />
							</AuthRoute>
						}
					/>

					<Route
						path="/"
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
