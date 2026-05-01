import { Navigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function HomeRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}
