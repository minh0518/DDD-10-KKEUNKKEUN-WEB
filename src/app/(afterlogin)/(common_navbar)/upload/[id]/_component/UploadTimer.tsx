'use client';

import { ChangeEventHandler, Dispatch, SetStateAction, forwardRef, useState } from 'react';

import { UploadDataType, ValidtaionType } from '@/types/service';

import styles from './UploadTimer.module.scss';
import InputFormSvgs from '../_svgs/InputFormSvgs';
import { UseFormGetValues } from 'react-hook-form';

interface UploadTimerProps {
  timeLimit: UploadDataType['timeLimit'];
  alertTime: UploadDataType['alertTime'];
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  getValues: UseFormGetValues<ValidtaionType>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ timeLimit, alertTime, setPresentationData, currentPageIndex, getValues }, ref) => {
    const [warn, setWarn] = useState(false);
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      let changeValue = Number(value);

      setPresentationData((prev) => {
        const shallow = { ...prev };
        const timeLimitShallow = { ...shallow.timeLimit };
        const alertTimeShallow = { ...shallow.alertTime };

        if (name === 'timeLimit_hour') {
          if (changeValue > 12) changeValue = 12;
          timeLimitShallow['hours'] = changeValue;
        }

        if (name === 'timeLimit_minute') {
          if (changeValue > 59) changeValue = 59;
          timeLimitShallow['minutes'] = changeValue;
        }

        if (name === 'alertTime_hour') {
          if (changeValue > 12) changeValue = 12;
          const alarmHour = changeValue;
          const alarmMinute = alertTimeShallow['minutes'] ?? 0;
          const limitHour = timeLimitShallow['hours'] ?? 0;
          const limitMinute = timeLimitShallow['minutes'] ?? 0;
          if (alarmHour * 60 + alarmMinute >= limitHour * 60 + limitMinute) {
            setWarn(true);
          } else {
            setWarn(false);
            alertTimeShallow['hours'] = changeValue;
          }
        }

        if (name === 'alertTime_minute') {
          if (changeValue > 59) changeValue = 59;

          const alarmHour = alertTimeShallow['hours'] ?? 0;
          const alarmMinute = changeValue;
          const limitHour = timeLimitShallow['hours'] ?? 0;
          const limitMinute = timeLimitShallow['minutes'] ?? 0;
          if (alarmHour * 60 + alarmMinute >= limitHour * 60 + limitMinute) {
            setWarn(true);
          } else {
            setWarn(false);
            alertTimeShallow['minutes'] = changeValue;
          }
        }

        shallow.title = getValues('title');
        shallow.timeLimit = timeLimitShallow;
        shallow.alertTime = alertTimeShallow;

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
              value={timeLimit.hours ? timeLimit.hours : ''}
              onChange={onChange}
              name="timeLimit_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="timer"
              value={timeLimit.minutes ? timeLimit.minutes : ''}
              onChange={onChange}
              name="timeLimit_minute"
              placeholder="00"
            />
            분
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alarm" className={styles.label}>
            중간 알림
            <InputFormSvgs>
              <InputFormSvgs.DeadlineDateDescription />
            </InputFormSvgs>
          </label>

          <div className={styles.timerInput}>
            {warn && (
              <p className={styles.alarmWaring}>알림 시간은 총 발표 시간보다 작아야 합니다.</p>
            )}
            <input
              type="number"
              id="alarm"
              value={alertTime.hours ? alertTime.hours : ''}
              onChange={onChange}
              name="alertTime_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="alarm"
              value={alertTime.minutes ? alertTime.minutes : ''}
              onChange={onChange}
              name="alertTime_minute"
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
