export function formatDateTimeLocal(date: string): string {
  return new Date(date).toISOString().slice(0, 16);
}
