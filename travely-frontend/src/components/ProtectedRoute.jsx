import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//component to protect routes from unauthorized users.

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />; //replace = replaces browsers history, so the user can't go back to a protected route
  }

  //return outlet = return the route inside this route (see routes in App.jsx). Avoid to return *specific page* since we want to be able to reuse this component
  return <Outlet />;
}

export default ProtectedRoute;
