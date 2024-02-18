'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef } from 'react';

import Input from '@/app/_components/_elements/Input';

import { PagesDataType } from '@/types/service';

import styles from './UploadTimer.module.scss';
import InputFormSvgs from '../_svgs/InputFormSvgs';

interface UploadTimerProps {
  time: PagesDataType['time'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ time, setPresentationData }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPresentationData((prev) => {
        let { name, value } = e.target;

        let timerHour = Math.floor((time.timer ? time.timer : 0) / 60);
        let timerMinute = (time.timer ? time.timer : 0) % 60;
        let alarmHour = Math.floor((time.alramTime ? time.alramTime : 0) / 60);
        let alarmMinute = (time.alramTime ? time.alramTime : 0) % 60;
        let changeValue = Number(value);

        const shallow = { ...prev.time };
        if (name === 'timerHour' || name === 'timerMinute') {
          if (name === 'timerHour') {
            if (changeValue > 12) changeValue = 12;
            timerHour = changeValue;
          }

          if (name === 'timerMinute') {
            if (changeValue > 59) changeValue = 59;
            timerMinute = changeValue;
          }

          const result = timerHour * 60 + timerMinute;
          shallow['timer'] = result;
        }

        if (name === 'alarmHour' || name === 'alarmMinute') {
          if (name === 'alarmHour') {
            if (changeValue > 12) changeValue = 12;
            alarmHour = changeValue;
          }
          if (name === 'alarmMinute') {
            if (changeValue > 59) changeValue = 59;
            alarmMinute = changeValue;
          }

          const result = alarmHour * 60 + alarmMinute;
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
            총 발표 시간
          </label>
          <div className={styles.timerInput}>
            <input
              type="number"
              id="timer"
              value={time.timer ? Math.floor(time.timer / 60) : ''}
              onChange={onChange}
              name="timerHour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="timer"
              value={time.timer ? time.timer % 60 : ''}
              onChange={onChange}
              name="timerMinute"
              placeholder="00"
            />
            분
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alarm" className={styles.label}>
            중간 알림
            <InputFormSvgs>
              <InputFormSvgs.DDayDescription />
            </InputFormSvgs>
          </label>

          <div className={styles.timerInput}>
            <input
              type="number"
              id="alarm"
              value={time.alramTime ? Math.floor(time.alramTime / 60) : ''}
              onChange={onChange}
              name="alarmHour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="alarm"
              value={time.alramTime ? time.alramTime % 60 : ''}
              onChange={onChange}
              name="alarmMinute"
              placeholder="00"
            />
            분
          </div>
        </div>
      </div>
    );
  },
);
UploadTimer.displayName = 'UploadTimer';

export default UploadTimer;
