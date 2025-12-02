import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children, type }) {
  const { isAuth, role } = useAuth();

  if (!isAuth) return <Navigate to={`/${type}/login`} />;

  if (role !== type) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;

