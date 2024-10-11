import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AuthRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return children;
};

export default AuthRoute;
