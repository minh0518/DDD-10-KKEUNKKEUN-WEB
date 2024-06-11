export const checkTimeValidate = (
  limitHour: number,
  limitMinute: number,
  alertHour: number,
  alertMinute: number,
): boolean => {
  return alertHour * 60 + alertMinute >= limitHour * 60 + limitMinute;
};
