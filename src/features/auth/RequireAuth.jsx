import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const content = isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;

  return content;
};
export default RequireAuth;
