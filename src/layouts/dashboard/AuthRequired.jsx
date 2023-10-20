/* eslint-disable react/prop-types */
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useLocation } from "react-router";

function AuthRequired({ children }) {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default AuthRequired;
