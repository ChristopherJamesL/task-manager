import { Routes, Route } from "react-router";
import Navbar from "./components/layout/Navbar";
import SigninPage from "./features/auth/pages/SignInPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import HomeRedirect from "./routes/HomeRedirect";
import Dashboard from "./features/dashboard/pages/DashboardPage";
import ListsPage from "./features/lists/pages/ListsPage";
import ListDetailPage from "./features/lists/pages/ListDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/lists/:id" element={<ListDetailPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
