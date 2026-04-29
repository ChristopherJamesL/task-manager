import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const { authStatus, logout } = useAuth();

  const handleSignout = async () => {
    try {
      setIsLoading(true);

      await logout();
    } catch (err) {
      console.log("Failed to log out: ", err);
    } finally {
      setIsLoading(false);
    }
  };

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
      <span className="text-blue-500 text-3xl">Task Manager</span>
      <span>
        {authStatus === "authenticated" ? (
          <button
            className="cursor-pointer"
            onClick={handleSignout}
            disabled={isLoading}
          >
            Logout
          </button>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </span>
    </div>
  );
}
