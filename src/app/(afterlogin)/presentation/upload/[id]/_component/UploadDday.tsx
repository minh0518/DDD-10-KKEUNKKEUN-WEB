'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { PagesDataType, ValidtaionType, Value } from '@/types/service';

import Input from '@/app/_components/_elements/Input';

import styles from './UploadDday.module.scss';

import CustomCalendar from './CustomCalendar';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface UploadDdayProps {
  dDay: PagesDataType['dDay'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

type dDayIndexType = 'date' | 'repeat' | 'includeToday';

const UploadDday = forwardRef<HTMLInputElement, UploadDdayProps>(
  ({ dDay, setPresentationData, register, errors }, ref) => {
    const registerOptions: RegisterOptions = {
      required: '날짜는 필수 입력입니다.',
    };

    const today = new Date();
    const [isCalenderOpen, setIsCalenderOpen] = useState(false);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        const { name, value } = e.target;

        const shallow = { ...prev.dDay };
        shallow[name as dDayIndexType] = value;

        return {
          ...prev,
          dDay: shallow,
        };
      });
    };

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
          <label htmlFor="date">
            날짜 <span>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setIsCalenderOpen((prev) => !prev)} type="button">
              {dDay.date ? dDay.date?.toLocaleString() : '날짜를 선택하세요'}
            </button>
            <input
              hidden
              value={dDay.date?.toLocaleString()}
              {...register('dDayDate', registerOptions)}
            />
            {errors.dDayDate && (
              <small role="alert" style={{ color: 'red' }}>
                {errors.dDayDate.message as string}
              </small>
            )}
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
        <div className={styles.inputWrapper}>
          <label htmlFor="repeat">일정 반복</label>

          <Input
            _className={styles.dDayInput}
            id="repeat"
            name="repeat"
            value={dDay.repeat || ''}
            onChange={onChange}
          />
        </div>
        <div>
          <div className={styles.inputWrapper}>
            <label htmlFor="includeToday">
              설정일로부터 1일
              <p className={styles.includeTodayDescription}>디데이 날짜를 1일로 포함합니다.</p>
            </label>

            <Input
              _className={styles.dDayInput}
              id="includeToday"
              name="includeToday"
              value={dDay.includeToday || ''}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  },
);
UploadDday.displayName = 'UploadDay';

export default UploadDday;
