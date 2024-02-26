'use client';

import { Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { UploadDataType, ValidtaionType, Value } from '@/types/service';

import styles from './UploadDeadlineDate.module.scss';

import CustomCalendar from './CustomCalendar';
import { FieldErrors, RegisterOptions, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import Required from './Required';
import { formatDate } from '../_utils/date';
import { VALIDATION_MESSAGE } from '@/config/const';

interface UploadDeadlineDateProps {
  deadlineDate: UploadDataType['deadlineDate'];
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
  currentPageIndex: number;
  getValues: UseFormGetValues<ValidtaionType>;
}

const UploadDeadlineDate = forwardRef<HTMLInputElement, UploadDeadlineDateProps>(
  ({ deadlineDate, setPresentationData, register, errors, getValues, currentPageIndex }, ref) => {
    const registerOptions: RegisterOptions = {
      required: VALIDATION_MESSAGE.DEADLINEDATE.REQUIRED,
    };

    const [isCalenderOpen, setIsCalenderOpen] = useState(false);

    const today = new Date();

    // 리액트 캘린더 전용 업데이트 함수
    const setDate: Dispatch<SetStateAction<Value>> = (newValue) => {
      setPresentationData((prev) => {
        const shallow = { ...prev };
        shallow.title = getValues('title');
        shallow.deadlineDate =
          newValue instanceof Function ? newValue(prev.deadlineDate) : newValue;
        const shallowSlides = [...shallow.slides];
        shallowSlides[currentPageIndex] = {
          ...shallowSlides[currentPageIndex],
          script: getValues('script'),
          memo: getValues('memo'),
        };
        return {
          ...shallow,
          slides: shallowSlides,
        };
      });
      // setPresentationData((prev) => ({
      //   ...prev,
      //   deadlineDate: newValue instanceof Function ? newValue(prev.deadlineDate) : newValue,
      // }));
    };

    return (
      <div className={styles.container}>
        <p className={styles.description}>D-day 설정</p>

        <div className={styles.inputWrapper}>
          <label htmlFor="date" className={styles.label}>
            날짜 <Required /> &nbsp;
            {errors.deadlineDate && (
              <small role="alert" style={{ color: '#DE3428', fontWeight: 'bolder' }}>
                {errors.deadlineDate.message as string}
              </small>
            )}
          </label>
          <div style={{ position: 'relative' }}>
            <button
              className={styles.calendarButton}
              onClick={() => setIsCalenderOpen((prev) => !prev)}
              type="button"
            >
              {deadlineDate ? (
                <p className={styles.selected}>{formatDate(deadlineDate)}</p>
              ) : (
                <p className={styles.placeholder}>YYYY.MM.DD</p>
              )}
            </button>
            <input
              hidden
              value={deadlineDate ? deadlineDate?.toLocaleString() : ''}
              {...register('deadlineDate', registerOptions)}
            />

            {isCalenderOpen && (
              <CustomCalendar
                today={today}
                date={deadlineDate}
                setDate={setDate}
                setIsCalenderOpen={setIsCalenderOpen}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
UploadDeadlineDate.displayName = 'UploadDeadlineDate';

export default UploadDeadlineDate;
