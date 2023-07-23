export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('ru-RU', options);
}
