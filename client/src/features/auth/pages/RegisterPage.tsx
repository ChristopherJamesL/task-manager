import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../queries/useRegisterMutation";
import { useSignInMutation } from "../queries/useSignInMutation";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerMutation = useRegisterMutation();
  const signInMutation = useSignInMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registerResult = await registerMutation.mutateAsync({
        username,
        email,
        password,
      });

      await signInMutation.mutateAsync({
        identifier: registerResult.user.email,
        password,
      });

      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      console.log("Register failed: ", err);
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <Input
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name="password"
          type="password"
          autoComplete="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          disabled={registerMutation.isPending || signInMutation.isPending}
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600 cursor-pointer" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
