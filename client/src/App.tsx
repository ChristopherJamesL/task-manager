import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import SigninPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1 flex items-center justify-center">
        {isAuthenticated ? (
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
