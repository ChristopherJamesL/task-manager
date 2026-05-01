import { Link } from "react-router";
import { useMeQuery } from "../../features/auth/queries/useMeQuery";
import { useLogoutMutation } from "../../features/auth/queries/useLogoutMutation";

export default function Navbar() {
  const { data, isLoading } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const user = data?.user ?? null;

  console.log("Navbar user:", user);
  console.log("Navbar isLoading:", isLoading);

  const handleSignout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) return null;

  return (
    <div
      className="
        flex 
        min-w-screen  
        p-2 
        border-b 
        border-b-gray-300 
        items-center
        justify-between 
        "
    >
      <Link className="text-blue-500 text-3xl" to="/">
        Task Manager
      </Link>
      <span>
        {user ? (
          <button
            className="cursor-pointer"
            onClick={handleSignout}
            disabled={logoutMutation.isPending}
          >
            Logout {user.username}
          </button>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </span>
    </div>
  );
}
