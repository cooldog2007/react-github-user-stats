import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return <>{children}</>;
};
export default PrivateRoute;
