import { Link } from "react-router";
import { useLogoutMutation } from "../../features/auth/queries/useLogoutMutation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { formatName } from "../../utils/format";
import Button from "../Button";

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleSignout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="w-full border-b border-gray-300">
      <div
        className="
          mx-auto
          flex 
          max-w-6xl
          items-center
          justify-between 
          px-4
          py-3
        "
      >
        <Link className="font-semibold text-2xl text-blue-600" to="/">
          Task Manager
        </Link>

        {isLoading ? (
          <span className="text-sm text-gray-500">Loading...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {formatName(user.username)}
            </span>

            <Link
              to="/dashboard"
              className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600"
            >
              Dashboard
            </Link>

            <Button
              onClick={handleSignout}
              disabled={logoutMutation.isPending}
              className="bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
            >
              {logoutMutation.isPending ? "Signing out..." : "Logout"}
            </Button>
          </div>
        ) : (
          <Link className="text-sm text-blue-600 hover:underline" to="/signin">
            SignIn
          </Link>
        )}
      </div>
    </nav>
  );
}
