'use client';

import { ChangeEventHandler, forwardRef, useState } from 'react';

import { ValidtaionType } from '@/types/service';

import styles from './UploadScript.module.scss';

import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import classNames from 'classnames/bind';
import Required from './Required';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadScriptProps {
  script: string;
  currentPageIndex: number;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  lastDummyPageIndex: number;
  setValue: UseFormSetValue<ValidtaionType>;
  errorForMovePage: {
    memo: boolean;
    script: {
      minLength: boolean;
      maxLength: boolean;
    };
  };
}

const cx = classNames.bind(styles);

const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  (
    { script, currentPageIndex, register, errors, lastDummyPageIndex, setValue, errorForMovePage },
    ref,
  ) => {
    const [currentLength, setCurrentLength] = useState(script.length);
    const registerOptions: RegisterOptions =
      currentPageIndex === lastDummyPageIndex
        ? {}
        : {
            required: VALIDATION_MESSAGE.SCRIPT.REQUIRED,
            maxLength: {
              value: MAX_LENGTH.SCRIPT,
              message: VALIDATION_MESSAGE.SCRIPT.MAX_LENGTH,
            },
          };

    const onCurrentLengthChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const value = e.target.value;
      setValue('script', value, { shouldValidate: true }); // mode : onChange 대체
      if (value.length > MAX_LENGTH.SCRIPT) {
        setValue('script', value.slice(0, MAX_LENGTH.SCRIPT + 1), { shouldValidate: true });
      }
      setCurrentLength(value.length);
    };

    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="script">
            {currentPageIndex + 1} 페이지 대본 붙여넣기 <Required />
          </label>

          {/* 훅 폼 유효성 검사 */}
          {errors.script && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.script.message as string}
            </small>
          )}

          {/* 최초 페이지 생성 후, 페이지 이동 유효성 검사 - 최소 길이 */}
          {!errors.script &&
            currentLength === 0 &&
            errorForMovePage.script.minLength &&
            lastDummyPageIndex !== currentPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )}
        </div>
        <div className={cx(['scriptSection', currentLength > MAX_LENGTH.SCRIPT && 'warning'])}>
          <textarea
            maxLength={MAX_LENGTH.SCRIPT + 1}
            id="script"
            className={styles.scriptTextarea}
            {...register('script', {
              ...registerOptions,
              onChange: onCurrentLengthChange,
            })}
            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          />
          <div
            className={cx(['lengthCount', currentLength > MAX_LENGTH.SCRIPT && 'lengthWarning'])}
          >
            <p>
              {currentLength > MAX_LENGTH.SCRIPT + 1 ? MAX_LENGTH.SCRIPT + 1 : currentLength}/
              {MAX_LENGTH.SCRIPT}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
