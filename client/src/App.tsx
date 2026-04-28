import { useState } from "react";
import { useAuth } from "./features/auth/context/AuthContext";
import Navbar from "./components/layout/Navbar";
import SigninPage from "./features/auth/pages/SignInPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

export default function App() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const { authStatus } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        {authStatus === "booting" ? (
          <div>Loading...</div>
        ) : authStatus === "authenticated" ? (
          <div>
            <h2>Welcome to your dashboard</h2>
          </div>
        ) : mode === "signin" ? (
          <SigninPage onSwitch={() => setMode("register")} />
        ) : (
          <RegisterPage onSwitch={() => setMode("signin")} />
        )}
      </main>
    </div>
  );
}
