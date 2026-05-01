import { Navigate } from "react-router";
import { useMeQuery } from "../features/auth/queries/useMeQuery";
import axios from "axios";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError, error } = useMeQuery();

  const user = data?.user ?? null;

  if (isLoading) return <div>Loading...</div>;

  let status: number | undefined;

  if (axios.isAxiosError(error)) {
    status = error.response?.status;
  }

  if (isError) {
    if (status === 401) return <Navigate to="/signin" replace />;

    return <div>Something went wrong. Try again</div>;
  }

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}
