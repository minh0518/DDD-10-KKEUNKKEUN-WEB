'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import Input from '@/app/_components/_elements/Input';

import { PagesDataType } from '@/types/service';

import styles from './UploadTimer.module.scss';

interface UploadTimerProps {
  time: PagesDataType['time'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ time, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        let { name, value } = e.target;

        let timerMinute = Math.floor((time.timer ? time.timer : 0) / 60);
        let timerSecond = (time.timer ? time.timer : 0) % 60;
        let alarmMinute = Math.floor((time.alramTime ? time.alramTime : 0) / 60);
        let alarmSecond = (time.alramTime ? time.alramTime : 0) % 60;
        let changeValue = Number(value);

        const shallow = { ...prev.time };
        // if (name === 'timerMinute' || name === 'alarmMinute') {
        if (name === 'timerMinute' || name === 'timerSecond') {
          if (name === 'timerMinute') {
            if (changeValue > 99) changeValue = 99;
            timerMinute = changeValue;
          }

          if (name === 'timerSecond') {
            if (changeValue > 59) changeValue = 59;
            timerSecond = changeValue;
          }

          const result = timerMinute * 60 + timerSecond;
          shallow['timer'] = result;
        }

        if (name === 'alarmMinute' || name === 'alarmSecond') {
          if (name === 'alarmMinute') {
            if (changeValue > 99) changeValue = 99;
            alarmMinute = changeValue;
          }
          if (name === 'alarmSecond') {
            if (changeValue > 59) changeValue = 59;
            alarmSecond = changeValue;
          }

          const result = alarmMinute * 60 + alarmSecond;
          shallow['alramTime'] = result;
        }

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
          <label htmlFor="timer" className={styles.label}>
            타이머
          </label>
          <div className={styles.timerInput}>
            <input
              type="number"
              id="timer"
              value={time.timer ? Math.floor(time.timer / 60) : ''}
              onChange={onChange}
              name="timerMinute"
              placeholder="00"
            />
            분 &nbsp;
            <input
              type="number"
              id="timer"
              value={time.timer ? time.timer % 60 : ''}
              onChange={onChange}
              name="timerSecond"
              placeholder="00"
            />
            초
          </div>
          {/* <Input
            value={time.timer || ''}
            onChange={onChange}
            id="timer"
            name="timer"
            className={styles.timerInput}
          /> */}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alarm" className={styles.label}>
            발표 마무리 전 알림
          </label>
          {/* <Input
            value={time.alramTime || ''}
            onChange={onChange}
            id="alramTime"
            name="alramTime"
            className={styles.timerInput}
          /> */}
          <div className={styles.timerInput}>
            <input
              type="number"
              id="alarm"
              value={time.alramTime ? Math.floor(time.alramTime / 60) : ''}
              onChange={onChange}
              name="alarmMinute"
              placeholder="00"
            />
            분 &nbsp;
            <input
              type="number"
              id="alarm"
              value={time.alramTime ? time.alramTime % 60 : ''}
              onChange={onChange}
              name="alarmSecond"
              placeholder="00"
            />
            초
          </div>
        </div>
      </div>
    );
  },
);
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
