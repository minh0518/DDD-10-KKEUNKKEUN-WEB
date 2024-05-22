export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  //   if (!(date instanceof Date) || isNaN(date.getTime())) {
  //     throw new Error('유효한 Date 객체를 입력해야 합니다.');
  //   }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};
