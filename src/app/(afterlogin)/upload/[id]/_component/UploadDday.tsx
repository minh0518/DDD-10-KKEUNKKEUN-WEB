'use client';

import { Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { PagesDataType, ValidtaionType, Value } from '@/types/service';

import styles from './UploadDday.module.scss';

import CustomCalendar from './CustomCalendar';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import Required from './Required';
import { formatDate } from '../_utils/date';
import { VALIDATION_MESSAGE } from '@/config/const';

interface UploadDdayProps {
  dDay: PagesDataType['dDay'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const UploadDday = forwardRef<HTMLInputElement, UploadDdayProps>(
  ({ dDay, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: VALIDATION_MESSAGE.DDAY.REQUIRED,
    };

    const [isCalenderOpen, setIsCalenderOpen] = useState(false);

    const today = new Date();

    // 리액트 캘린더 전용 업데이트 함수
    const setDate: Dispatch<SetStateAction<Value>> = (newValue) => {
      setPresentationData((prev) => ({
        ...prev,
        dDay: {
          ...prev.dDay,
          date: newValue instanceof Function ? newValue(prev.dDay.date) : newValue,
        },
      }));
    };

    return (
      <div className={styles.container}>
        <p className={styles.description}>D-day 설정</p>

        <div className={styles.inputWrapper}>
          <label htmlFor="date" className={styles.label}>
            날짜 <Required /> &nbsp;
            {errors.dDayDate && (
              <small role="alert" style={{ color: '#DE3428', fontWeight: 'bolder' }}>
                {errors.dDayDate.message as string}
              </small>
            )}
          </label>
          <div style={{ position: 'relative' }}>
            <button
              className={styles.calendarButton}
              onClick={() => setIsCalenderOpen((prev) => !prev)}
              type="button"
            >
              {dDay.date ? (
                <p className={styles.selected}>{formatDate(dDay.date)}</p>
              ) : (
                <p className={styles.placeholder}>YYYY.MM.DD</p>
              )}
            </button>
            <input
              hidden
              value={dDay.date?.toLocaleString()}
              {...register('dDayDate', registerOptions)}
            />

            {isCalenderOpen && (
              <CustomCalendar
                today={today}
                date={dDay.date}
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
UploadDday.displayName = 'UploadDay';

export default UploadDday;
