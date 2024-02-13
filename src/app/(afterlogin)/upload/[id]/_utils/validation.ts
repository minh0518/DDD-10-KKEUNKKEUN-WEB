import { MAX_LENGTH } from '@/config/const';
import { PagesDataType } from '@/types/service';

export const checkValidtaion = (presentationData: PagesDataType, currentPageIndex: number) => {
  const memoLength = presentationData.scripts[currentPageIndex].memo?.length || 0;
  const scriptLength = presentationData.scripts[currentPageIndex].script?.length || 0;

  const result = {
    memo: memoLength > MAX_LENGTH.MEMO,
    script: {
      minLength: scriptLength === 0,
      maxLength: scriptLength > MAX_LENGTH.SCRIPT,
    },
  };
  return result;
};
