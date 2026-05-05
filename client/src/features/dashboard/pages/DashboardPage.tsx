import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/lists");
  };
  return (
    <div className="flex flex-col justify-between">
      <h2>Welcome to your dashboard</h2>
      <button
        className="border mt-2 bg-emerald-600 cursor-pointer"
        onClick={handleNavigate}
      >
        Lists
      </button>
    </div>
  );
}
