'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { ValidtaionType } from '@/types/service';

import styles from './UploadTitle.module.scss';
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Required from './Required';

import classNames from 'classnames/bind';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadTitleProps {
  title: string;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  setValue: UseFormSetValue<ValidtaionType>;
}

const cx = classNames.bind(styles);

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>(
  ({ title, register, errors, setValue }, ref) => {
    const [currentLength, setCurrentLength] = useState(title.length);
    const registerOptions: RegisterOptions = {
      required: VALIDATION_MESSAGE.TITLE.REQUIRED,
      maxLength: {
        value: MAX_LENGTH.TITLE,
        message: VALIDATION_MESSAGE.TITLE.MAX_LENGTH,
      },
    };

    const onCurrentLengthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      setValue('title', value, { shouldValidate: true });
      if (value.length > MAX_LENGTH.TITLE) {
        setValue('title', value.slice(0, MAX_LENGTH.TITLE + 1), { shouldValidate: true });
      }
      setCurrentLength(value.length);
    };
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="title">
            발표 이름 <Required />
          </label>

          {/* 제출용 훅 폼 유효성 검사 */}
          {errors.title && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.title.message as string}
            </small>
          )}
        </div>
        <div className={cx(['titleSection', currentLength > MAX_LENGTH.TITLE && 'warning'])}>
          <input
            maxLength={MAX_LENGTH.TITLE + 1}
            {...register('title', {
              ...registerOptions,
              onChange: onCurrentLengthChange,
            })}
            placeholder="이름을 입력해주세요."
            id="title"
            className={styles.titleInput}
          />
          <div className={cx(['lengthCount', currentLength > MAX_LENGTH.TITLE && 'lengthWarning'])}>
            <p>
              {currentLength > MAX_LENGTH.TITLE + 1 ? MAX_LENGTH.TITLE + 1 : currentLength}/
              {MAX_LENGTH.TITLE}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
UploadTitle.displayName = 'UploadTitle';
export default UploadTitle;
