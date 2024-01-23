'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import { PagesDataType } from '@/types/service';

import Input from '@/app/_components/_elements/Input';

import styles from './UploadDday.module.scss';

interface UploadDdayProps {
  dDay: PagesDataType['dDay'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

type dDayIndexType = 'date' | 'repeat' | 'includeToday';
const UploadDday = forwardRef<HTMLInputElement, UploadDdayProps>(
  ({ dDay, setPresentationData }, ref) => {
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
    return (
      <div className={styles.container}>
        <p className={styles.description}>D-day 설정</p>
        <div className={styles.inputWrapper}>
          <p>날짜</p>
          <Input
            _className={styles.dDayInput}
            name="date"
            value={dDay.date || ''}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>일정 반복</p>
          <Input
            _className={styles.dDayInput}
            name="repeat"
            value={dDay.repeat || ''}
            onChange={onChange}
          />
        </div>
        <div>
          <div className={styles.inputWrapper}>
            <p>설정일로부터 1일</p>
            <Input
              _className={styles.dDayInput}
              name="includeToday"
              value={dDay.includeToday || ''}
              onChange={onChange}
            />
          </div>
          <p className={styles.includeTodayDescription}>디데이 날짜를 1일로 포함합니다.</p>
        </div>
      </div>
    );
  },
);
UploadDday.displayName = 'UploadDay';

export default UploadDday;
