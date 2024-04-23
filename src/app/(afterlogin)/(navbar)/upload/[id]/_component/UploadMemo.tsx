'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { UploadDataType, ValidtaionType } from '@/types/service';

import styles from './UploadMemo.module.scss';
import classNames from 'classnames/bind';
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';
import InputFormSvgs from '../_svgs/InputFormSvgs';

interface UploadMemoProps {
  memo: string;
  currentPageIndex: number;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  lastDummyPageIndex: number;
  setValue: UseFormSetValue<ValidtaionType>;
}

const cx = classNames.bind(styles);

const UploadMemo = forwardRef<HTMLInputElement, UploadMemoProps>(
  ({ memo, currentPageIndex, register, errors, lastDummyPageIndex, setValue }, ref) => {
    const [currentLength, setCurrentLength] = useState(memo.length);
    const registerOptions: RegisterOptions =
      currentPageIndex === lastDummyPageIndex
        ? {}
        : {
            maxLength: {
              value: MAX_LENGTH.MEMO,
              message: VALIDATION_MESSAGE.MEMO.MAX_LENGTH,
            },
          };

    const onCurrentLengthChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const value = e.target.value;
      setValue('memo', value, { shouldValidate: true });
      if (value.length > MAX_LENGTH.MEMO) {
        setValue('memo', value.slice(0, MAX_LENGTH.MEMO + 1), { shouldValidate: true });
      }
      setCurrentLength(value.length);
    };

    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="memo"> 메모 작성하기 </label>
          <InputFormSvgs>
            <InputFormSvgs.MemoDescription />
          </InputFormSvgs>

          {/* 제출용 훅 폼 유효성 검사 */}
          {errors.memo && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.memo.message as string}
            </small>
          )}
        </div>
        <p className={styles.guide}>발표하면서 계속 확인해야 하는 내용을 메모해보세요. </p>
        <div className={cx(['memoSection', currentLength > MAX_LENGTH.MEMO && 'warning'])}>
          <textarea
            maxLength={MAX_LENGTH.MEMO + 1}
            id="memo"
            className={styles.memoTextarea}
            {...register('memo', {
              ...registerOptions,
              onChange: onCurrentLengthChange,
            })}
            placeholder="ex. 목소리 크기, 바른 자세 등에 관한 메모를 작성해주세요."
          />
          <div className={cx(['lengthCount', currentLength > MAX_LENGTH.MEMO && 'lengthWarning'])}>
            <p>
              {currentLength > MAX_LENGTH.MEMO + 1 ? MAX_LENGTH.MEMO + 1 : currentLength}/
              {MAX_LENGTH.MEMO}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
UploadMemo.displayName = 'UploadMemo';

export default UploadMemo;
