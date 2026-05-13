export function formatDate(dateString?: string | null) {
  if (!dateString) return null;

  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
