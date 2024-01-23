'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType } from '@/types/service';

import styles from './UploadMemo.module.scss';

interface UploadMemoProps {
  memo: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadMemo = forwardRef<HTMLInputElement, UploadMemoProps>(
  ({ memo, currentPageIndex, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          memo: e.target.value,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <p>메모 작성하기</p>
        <p className={styles.description}>발표하면서 계속 확인해야 하는 내용을 메모해보세요. </p>
        <textarea
          className={styles.memoInput}
          value={memo || ''}
          onChange={onChange}
          placeholder="ex. 목소리 크기, 바른 자세 등에 관한 메모를 작성해주세요. "
        />
      </div>
    );
  },
);
UploadMemo.displayName = 'UploadMemo';

export default UploadMemo;
