import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
