import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ children }) => {
	const auth = useAuth();
	const isAuthenticated = auth.isAuthenticated;

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
