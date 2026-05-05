import { useMeQuery } from "../queries/useMeQuery";

export function useAuth() {
  const meQuery = useMeQuery();

  return {
    user: meQuery.data?.user ?? null,
    isAuthenticated: !!meQuery.data?.user,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
  };
}
