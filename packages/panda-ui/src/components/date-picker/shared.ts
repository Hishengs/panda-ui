export function isValidDate(date: any) {
  return date && !Number.isNaN(new Date(date).getDate());
}
