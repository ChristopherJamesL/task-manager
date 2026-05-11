import { useMeQuery } from "../queries/useMeQuery";

export function useAuth() {
  const meQuery = useMeQuery();

  return {
    user: meQuery.data ?? null,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
  };
}
