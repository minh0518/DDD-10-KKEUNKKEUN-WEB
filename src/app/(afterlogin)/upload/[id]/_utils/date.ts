import { Value } from '@/types/service';

export const formatDate = (date: Value) => {
  if (typeof date === 'string') {
    date = new Date(date);
    return formatDatePiece(date);
  }
  if (date instanceof Date) return formatDatePiece(date);
  // if (Array.isArray(date)) return date[0] ? formatDatePiece(date[0]) : '';
  return '';
};

const formatDatePiece = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthStr = month < 10 ? '0' + month : String(month);
  const dayStr = day < 10 ? '0' + day : String(day);

  return `${date.getFullYear()}.${monthStr}.${dayStr}`;
};
