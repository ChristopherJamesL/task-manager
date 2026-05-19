import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../queries/useRegisterMutation";
import { useSignInMutation } from "../queries/useSignInMutation";
import { AxiosError } from "axios";
import AuthCard from "../components/AuthCard";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import type { ApiErrorResponse } from "../../../types/api.types";

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
      await registerMutation.mutateAsync({
        username,
        email,
        password,
      });

      await signInMutation.mutateAsync({
        identifier: email,
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

  const errorMessage = registerMutation.isError
    ? (registerMutation.error as AxiosError<ApiErrorResponse>)?.response?.data
        ?.error?.message || "Something went wrong"
    : null;

  return (
    <AuthCard>
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-3">
        <Input
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          value={username}
          disabled={registerMutation.isPending || signInMutation.isPending}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          disabled={registerMutation.isPending || signInMutation.isPending}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          disabled={registerMutation.isPending || signInMutation.isPending}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending || signInMutation.isPending}
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        <p className="text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600 cursor-pointer" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
