import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSignInMutation } from "../queries/useSignInMutation";
import { AxiosError } from "axios";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import type { ApiErrorResponse } from "../../../types/api.types";

export default function SigninPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const message =
        (err as AxiosError<ApiErrorResponse>)?.response?.data?.error?.message ||
        "Something went wrong";

      setErrorMessage(message);
    }
  };

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSignIn} className="space-y-3">
        <Input
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="Email or username"
          value={identifier}
          disabled={signInMutation.isPending}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          disabled={signInMutation.isPending}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={signInMutation.isPending}
        >
          {signInMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        <p className="text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-600 cursor-pointer" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
