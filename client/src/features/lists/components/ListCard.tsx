import { Link } from "react-router";
import { formatName } from "../../../utils/format";
import type { List } from "../types/lists.types";

export default function ListCard({
  list,
  listNumber,
}: {
  list: List;
  listNumber: number;
}) {
  return (
    <li>
      <Link
        className="flex items-center justify-between rounded border bg-white p-4 transition hover:bg-gray50"
        to={`/lists/${list.id}`}
      >
        <div className="font-medium">{formatName(list.name)}</div>
        <div>List #{listNumber}</div>
      </Link>
    </li>
  );
}
