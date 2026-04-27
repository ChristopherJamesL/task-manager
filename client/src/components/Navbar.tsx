import { useState } from "react";
import { getToken } from "../api/auth/auth.token";
import { logoutFlow } from "../api/auth/auth.flow";
import { useAuth } from "../contexts/AuthContext";

type NavbarPropsType = {
  isAuthenticated: boolean;
};

export default function Navbar({ isAuthenticated }: NavbarPropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const token = getToken();

  const handleSignout = async () => {
    try {
      setIsLoading(true);

      const response = await logoutFlow(token, logout);

      console.log(response.data.message);
    } catch (err) {
      console.log("Failed to log out: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
      <span className="text-blue-500 text-3xl">Task Manager</span>
      <span style={{ float: "right" }}>
        {isAuthenticated ? (
          <button
            className="cursor-pointer"
            onClick={handleSignout}
            disabled={isLoading}
          >
            Logout
          </button>
        ) : (
          <span>Not signed in</span>
        )}
      </span>
    </div>
  );
}
