import { useState } from "react";
import { signInFlow, logoutFlow } from "../api/auth/auth.flow";
import { useAuth } from "../contexts/AuthContext";
import { getToken } from "../api/auth/auth.token";

export default function SigninPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getToken();

  const { signIn, logout } = useAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const user = await signInFlow({ identifier, password }, signIn);
      console.log("user: ", user);

      console.log("Signed in as: ", user.username);
    } catch (err) {
      console.log("Sign in failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const response = await logoutFlow(token, logout);

      console.log(response.data.message);
    } catch (err) {
      console.log("logout failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>

      <input
        placeholder="Email or username"
        type="email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <button onClick={handleSignOut} disabled={loading}>
        Sign out
      </button>
    </div>
  );
}
