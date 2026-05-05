import { useNavigate } from "react-router";
import type { ListType } from "../types/lists.types";

export default function ListCard({ list }: { list: ListType }) {
  const navigate = useNavigate();

  return (
    <li
      className="border p-2 rounded mb-2 cursor-pointer hover:bg-gray-300 flex justify-between"
      onClick={() => navigate(`/lists/${list.id}`)}
    >
      <span>{list.name}</span>
      <span>ID: {list.id}</span>
    </li>
  );
}
