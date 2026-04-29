import { Navigate } from "react-router";
import { useAuth } from "../features/auth/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuth();

  if (authStatus === "booting") return <div>Loading...</div>;

  if (authStatus !== "authenticated") {
    console.log(
      "protected route hit, authenticated false, re-routing to signin",
    );

    return <Navigate to="/signin" replace />;
  }

  return children;
}
