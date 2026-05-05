import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSignInMutation } from "../queries/useSignInMutation";
import { AxiosError } from "axios";
import type { ApiError } from "../types/auth.types";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function SigninPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInMutation.mutateAsync({ identifier, password });

      setIdentifier("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      console.log("Sign in failed: ", err);
    }
  };

  const errorMessage = signInMutation.isError
    ? (signInMutation.error as AxiosError<ApiError>)?.response?.data?.error
        ?.message || "Something went wrong"
    : null;

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSignIn}>
        <Input
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="Email or username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Input
          name="password"
          type="password"
          autoComplete="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={signInMutation.isPending}>
          {signInMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>

        {errorMessage && <p className="mt-3 text-sm">{errorMessage}</p>}

        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-600 cursor-pointer" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
