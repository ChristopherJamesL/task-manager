import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/layout/Navbar";
import SigninPage from "./features/auth/pages/SignInPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useMeQuery } from "./features/auth/queries/useMeQuery";

function Dashboard() {
  return <h2>Welcome to your dashboard</h2>;
}

function HomeRedirect() {
  const { data, isLoading } = useMeQuery();

  if (isLoading) return <div>Loading...</div>;

  const user = data?.user;

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
}

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
