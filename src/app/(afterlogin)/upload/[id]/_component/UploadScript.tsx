'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadScript.module.scss';

import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import classNames from 'classnames/bind';
import Required from './Required';
import { MAX_LENGTH, VALIDATION_MESSAGE } from '@/config/const';

interface UploadScriptProps {
  script: string;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  lastDummyPageIndex: number;
  erroOnEachPage: {
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
    {
      script,
      currentPageIndex,
      setPresentationData,
      register,
      errors,
      lastDummyPageIndex,
      erroOnEachPage,
    },
    ref,
  ) => {
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

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      let scriptValue = e.target.value;
      if (scriptValue.length >= MAX_LENGTH.SCRIPT + 1) {
        scriptValue = scriptValue.slice(0, MAX_LENGTH.SCRIPT + 1);
      }

      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow[currentPageIndex] = {
          ...shallow[currentPageIndex],
          script: scriptValue,
        };

        return {
          ...prev,
          scripts: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          <label htmlFor="script">
            {currentPageIndex + 1} 페이지 대본 붙여넣기 <Required />
          </label>

          {/* 제출용 훅 폼 유효성 검사 */}
          {errors.script && (
            <small role="alert" style={{ color: '#DE3428' }}>
              {errors.script.message as string}
            </small>
          )}
          {/* 작성 시(+페이지 이동 시) 유효성 검사 - 최소 길이*/}
          {!errors.script &&
            erroOnEachPage.script.minLength &&
            !script.length &&
            currentPageIndex !== lastDummyPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.REQUIRED}
              </small>
            )}

          {/* 작성 시 유효성 검사 - 최대 길이*/}
          {!errors.script &&
            // (erroOnEachPage.script.maxLength || script.length > MAX_LENGTH.SCRIPT) &&
            script.length > MAX_LENGTH.SCRIPT &&
            currentPageIndex !== lastDummyPageIndex && (
              <small role="alert" style={{ color: '#DE3428' }}>
                {VALIDATION_MESSAGE.SCRIPT.MAX_LENGTH}
              </small>
            )}
        </div>
        <div className={cx(['scriptSection', script.length > MAX_LENGTH.SCRIPT && 'warning'])}>
          <textarea
            id="script"
            className={styles.scriptTextarea}
            value={script}
            {...register('script', registerOptions)}
            onChange={onChange}
            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          />
          <div
            className={cx(['lengthCount', script?.length > MAX_LENGTH.SCRIPT && 'lengthWarning'])}
          >
            <p>
              {script?.length}/{MAX_LENGTH.SCRIPT}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
