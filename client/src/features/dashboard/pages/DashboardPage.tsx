import { Link } from "react-router";

// TODO Needs Profiles, settings, and analytics

export default function Dashboard() {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-6">Welcome to your dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Link
          to="/lists"
          className="border block p-5 rounded bg-white hover:bg-gray-50 transition"
        >
          <div className="text-lg font-medium">Lists</div>

          <div className="text-sm text-gray-500 mt-1">
            Create, view, and manage task lists
          </div>
        </Link>

        <Link
          className="border block p-5 rounded bg-white hover:bg-gray-50 transition"
          to="/tasks"
        >
          <div className="text-lg font-medium">Tasks</div>

          <div className="text-sm text-gray-500 mt-1">
            View and track your tasks
          </div>
        </Link>
      </div>
    </div>
  );
}
