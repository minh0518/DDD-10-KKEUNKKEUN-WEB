'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType } from '@/types/service';

import styles from './UploadScript.module.scss';

interface UploadScriptProps {
  script: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}
const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  ({ script, currentPageIndex, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          script: e.target.value,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <p>{currentPageIndex + 1} 페이지 대본 붙여넣기</p>
        <textarea
          className={styles.scriptInput}
          value={script || ''}
          onChange={onChange}
          placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
        ></textarea>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
