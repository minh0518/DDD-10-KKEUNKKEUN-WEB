export const combineClassName = (classes: string[]) => {
  if (!classes) return '';
  return classes.join(' ');
};
