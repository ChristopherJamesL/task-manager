import { Navigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function HomeRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return <Navigate to={user ? "/dashboard" : "/signin"} replace />;
}
