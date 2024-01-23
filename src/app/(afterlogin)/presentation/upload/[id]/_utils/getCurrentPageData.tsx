import { RefObject } from 'react';

interface RefsValueType {
  title: string;
  script: string;
  day: any;
  timer: any;
}
export const getCurrentRefsData = (
  inputRefs: Map<string, RefObject<HTMLInputElement>>,
): RefsValueType => {
  return {
    title: inputRefs.get('title')?.current?.value || '',
    script: inputRefs.get('script')?.current?.value || '',
    day: inputRefs.get('day')?.current?.value || null,
    timer: inputRefs.get('timer')?.current?.value || null,
  };
};
