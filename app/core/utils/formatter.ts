export function numberOnly (value: string, decimal: number = 0): string {

  // remove all non numeric character except dot and comma
  value = value.replace(/[^0-9.]/g, '');

  // change comma to dot
  value = value.replace(/,/g, '.');

  if (!value) return '';
  
  if (value[0] === '.') value = `0${value}`;

  if (value.indexOf('.') !== -1) {
    const [before, after] = value.split('.');
    return `${before}.${after.slice(0, decimal)}`;
  }
  
  return parseInt(value.replace(/[^0-9.]/g, '')).toString();
}

export function formatDate (date: Date): string {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function maskingDateFormat (date: string): string {
  if (!date) return '';

  // remove all non numeric character
  date = date.replace(/[^0-9]/g, '');

  // add dash
  if (date.length > 2 && date.length < 5) {
    date = `${date.slice(0, 2)}-${date.slice(2)}`;
  }
  else if (date.length > 4) {
    date = `${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4)}`;
  }

  return date;
}

export function parseDate(dateString: string): Date {
  var parts = dateString.split("-");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);
  
  // Membuat objek Date dari tahun, bulan, dan tanggal
  var date = new Date(year, month - 1, day);
  return date;
}

export function maxLenght(value: string, max: number): string {
  return value.slice(0, max);
}