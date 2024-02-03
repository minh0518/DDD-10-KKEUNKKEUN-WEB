'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType, ValidtaionType } from '@/types/service';

import styles from './UploadScript.module.scss';

import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import classNames from 'classnames/bind';
import TextArea from '@/app/_components/_elements/TextArea';

interface UploadScriptProps {
  script: string | null;
  currentPageIndex: number;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;

  errors: FieldErrors<ValidtaionType>;
}

const cx = classNames.bind(styles);

const UploadScript = forwardRef<HTMLInputElement, UploadScriptProps>(
  ({ script, currentPageIndex, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: '대본은 필수 입력입니다.',
      maxLength: {
        value: 5000,
        message: '5000자 이내로 작성해 주세요.',
      },
    };

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      let scriptValue = e.target.value;
      if (scriptValue.length >= 5001) {
        scriptValue = scriptValue.slice(0, 5001);
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
        <label htmlFor="script">
          {currentPageIndex + 1} 페이지 대본 붙여넣기 <span>*</span>
        </label>

        {errors.script && (
          <small role="alert" style={{ color: 'red' }}>
            {errors.script.message as string}
          </small>
        )}
        <div className={styles.scriptSection}>
          <TextArea
            id="script"
            {...register('script', registerOptions)}
            size="size_lg"
            width="width_full"
            theme="theme_gray"
            warning={script!.length > 5000}
            value={script || ''}
            onChange={onChange}
            placeholder="가지고 있는 대본을 이곳에 복사하여 붙여 넣어주세요."
          ></TextArea>
          <span className={styles.lengthCount}>{script?.length}/5000</span>
        </div>
      </div>
    );
  },
);

UploadScript.displayName = 'UploadScript';

export default UploadScript;
