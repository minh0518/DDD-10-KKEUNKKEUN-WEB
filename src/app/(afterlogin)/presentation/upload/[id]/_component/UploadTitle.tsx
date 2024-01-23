'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType } from '@/types/service';

import Input from '@/app/_components/_elements/Input';

import styles from './UploadTitle.module.scss';

interface UploadTitleProps {
  title: string | null;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>(
  ({ title, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        return {
          ...prev,
          title: e.target.value,
        };
      });
    };
    return (
      <div className={styles.container}>
        <p>발표 이름</p>
        <Input
          placeholder="이름을 입력해주세요."
          value={title || ''}
          onChange={onChange}
          className={styles.titleInput}
        />
      </div>
    );
  },
);
UploadTitle.displayName = 'UploadTitle';
export default UploadTitle;
