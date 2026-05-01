import { Routes, Route } from "react-router";
import Navbar from "./components/layout/Navbar";
import SigninPage from "./features/auth/pages/SignInPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeRedirect from "./routes/HomeRedirect";
import Dashboard from "./features/dashboard/pages/DashboardPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
