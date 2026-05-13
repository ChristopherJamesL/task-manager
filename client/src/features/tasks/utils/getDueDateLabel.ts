import { formatDate } from "../../../utils/formatDate";

export function getDueDateLabel(dueDate?: string | null) {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  const now = new Date();

  const isOverdue = date < now;

  return {
    label: formatDate(dueDate),
    isOverdue,
  };
}
