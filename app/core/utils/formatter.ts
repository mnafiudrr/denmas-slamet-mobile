export function numberOnly (value: string): string {
  return value.replace(/\D/g, '');
}