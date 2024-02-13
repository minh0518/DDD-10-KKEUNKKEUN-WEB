'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadTitle.module.scss';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Required from './Required';

import classNames from 'classnames/bind';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadTitleProps {
  title: string;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const cx = classNames.bind(styles);

const UploadTitle = forwardRef<HTMLInputElement, UploadTitleProps>(
  ({ title, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: '제목은 필수 입력입니다.',
      maxLength: {
        value: MAX_LENGTH.TITLE,
        message: '20자 이내로 작성해주세요.',
      },
    };
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let titleValue = e.target.value;
      if (titleValue.length >= MAX_LENGTH.TITLE + 1) {
        titleValue = titleValue.slice(0, MAX_LENGTH.TITLE + 1);
      }
      setPresentationData((prev) => {
        return {
          ...prev,
          title: titleValue,
        };
      });
    };
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="title">
            발표 이름 <Required />
          </label>
          {errors.title && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.title.message as string}
            </small>
          )}

          {!errors.title && title.length > MAX_LENGTH.TITLE && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {VALIDATION_MESSAGE.TITLE.MAX_LENGTH}
            </small>
          )}
          {!errors.title && title.length === 0 && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {VALIDATION_MESSAGE.TITLE.REQUIRED}
            </small>
          )}
        </div>
        <div className={cx(['titleSection', title.length > MAX_LENGTH.TITLE && 'warning'])}>
          <input
            {...register('title', registerOptions)}
            placeholder="이름을 입력해주세요."
            id="title"
            value={title || ''}
            onChange={onChange}
            className={styles.titleInput}
          />
          <div className={cx(['lengthCount', title?.length > MAX_LENGTH.TITLE && 'lengthWarning'])}>
            <p>
              {title?.length}/{MAX_LENGTH.TITLE}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
UploadTitle.displayName = 'UploadTitle';
export default UploadTitle;
