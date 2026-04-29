import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      setLoading(true);

      const user = await register({ username, email, password });

      console.log("Registered + logged in: ", user);
      navigate("/");
    } catch (err) {
      console.log("Register failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <Input
        placeholder="Username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister} disabled={loading}>
        Register
      </Button>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <button className="text-blue-600 cursor-pointer">
          <Link to="/signin">Sign in</Link>
        </button>
      </p>
    </AuthCard>
  );
}
