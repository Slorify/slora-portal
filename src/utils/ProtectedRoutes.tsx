import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface ProtectedRoutesProps {
  redirectUrl: string;
  invert?: boolean;
}

const ProtectedRoutes = ({ redirectUrl, invert }: ProtectedRoutesProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (invert) {
    return !user ? <Outlet /> : <Navigate to={redirectUrl} replace />;
  }

  return user ? <Outlet /> : <Navigate to={redirectUrl} replace />;
};

export default ProtectedRoutes;
