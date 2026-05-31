import { Routes, Route } from "react-router";
// import Navbar from "./components/layout/Navbar";
import SigninPage from "./features/auth/pages/SignInPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import HomeRedirect from "./routes/HomeRedirect";
import Dashboard from "./features/dashboard/pages/DashboardPage";
import ListsPage from "./features/lists/pages/ListsPage";
import ListDetailPage from "./features/lists/pages/ListDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import TaskPage from "./features/tasks/pages/TaskPage";
import TasksPage from "./features/tasks/pages/TasksPage";
import AuthLayout from "./components/layout/AuthLayout";
import TopAppLayout from "./components/layout/TopAppLayout";
import CenteredAppLayout from "./components/layout/CenteredAppLayout";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<CenteredAppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lists" element={<ListsPage />} />
          </Route>

          <Route element={<TopAppLayout />}>
            <Route path="/lists/:id" element={<ListDetailPage />} />
            <Route path="/tasks/:taskId" element={<TaskPage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
