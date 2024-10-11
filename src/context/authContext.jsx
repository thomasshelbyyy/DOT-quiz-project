import { createContext, useContext, useState } from "react";

// Buat context
const AuthContext = createContext();

// Hook untuk memudahkan akses ke auth context
export const useAuth = () => {
	return useContext(AuthContext);
};

// Penyedia untuk membungkus komponen yang membutuhkan status login
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(localStorage.getItem("auth")) || false
	);

	const [loggedInUser, setLoggedInUser] =
		useState(localStorage.getItem("loggedInUser")) || null;

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				loggedInUser,
				setLoggedInUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
