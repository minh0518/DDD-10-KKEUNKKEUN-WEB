'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import Input from '@/app/_components/_elements/Input';

import styles from './UploadTitle.module.scss';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface UploadTitleProps {
  title: string | null;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>(
  ({ title, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: '제목은 필수 입력입니다.',
      minLength: {
        value: 2,
        message: '2자리 이상으로 작성하세요.',
      },
    };
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
        <label htmlFor="title">
          발표 이름 <span>*</span>
        </label>
        {errors.title && (
          <small role="alert" style={{ color: 'red' }}>
            {errors.title.message as string}
          </small>
        )}
        <Input
          {...register('title', registerOptions)}
          placeholder="이름을 입력해주세요."
          id="title"
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
