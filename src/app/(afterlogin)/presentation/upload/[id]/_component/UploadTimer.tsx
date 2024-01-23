'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import Input from '@/app/_components/_elements/Input';

import { PagesDataType } from '@/types/service';

import styles from './UploadTimer.module.scss';

interface UploadTimerProps {
  time: PagesDataType['time'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}
type timerIndexType = 'timer' | 'alramTime';
const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ time, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        const { name, value } = e.target;

        const shallow = { ...prev.time };
        shallow[name as timerIndexType] = value;
        return {
          ...prev,
          time: shallow,
        };
      });
    };
    return (
      <div className={styles.container}>
        <p className={styles.description}>발표시간 설정</p>
        <div className={styles.inputWrapper}>
          <p>타이머</p>
          <Input
            value={time.timer || ''}
            onChange={onChange}
            name="timer"
            className={styles.timerInput}
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>발표 마무리 전 알림</p>
          <Input
            value={time.alramTime || ''}
            onChange={onChange}
            name="alramTime"
            className={styles.timerInput}
          />
        </div>
      </div>
    );
  },
);
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
