/** 시간 목록 반환 함수
 *
 * TimePicker.tsx에서 사용
 *
 * @param min 최솟값
 * @param max 최댓값
 * @param gap 시간 간격
 */
export const getTimeList = (min: number, max: number, gap: number) => {
  if (max - min < gap) return [];

  return Array.from({ length: (max - min) / gap + 1 }, (_, i) => (min + i * gap).toString());
};
