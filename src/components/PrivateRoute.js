// src/components/PrivateRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, token, role } = useContext(AuthContext);

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />; // or show "Unauthorized"
  }

  return children;
};

export default PrivateRoute;
