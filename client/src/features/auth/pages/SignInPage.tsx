import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function SigninPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const user = await signIn({ identifier, password });
      console.log("user: ", user);

      console.log("Signed in as: ", user.username);
      setIdentifier("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log("Sign in failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSignIn}>
        <Input
          placeholder="Email or username"
          type="email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <button className="text-blue-600 cursor-pointer">
            <Link to="/register">Register</Link>
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
