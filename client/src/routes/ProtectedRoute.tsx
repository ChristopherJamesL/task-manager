import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function ProtectedRoute() {
  console.log("protected route hit...");

  const { user, isLoading } = useAuth();

  console.log("user in protected route: ", user);

  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user)
    return <Navigate to="/signin" replace state={{ from: location }} />;

  return <Outlet />;
}
