import { Link } from "react-router";
import { useLogoutMutation } from "../../features/auth/queries/useLogoutMutation";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleSignout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-w-screen p-2 border-b border-b-gray-300 justify-between">
        <span className="text-blue-500 text-3xl">Task Manager</span>
        <span>...</span>
      </div>
    );
  }

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
