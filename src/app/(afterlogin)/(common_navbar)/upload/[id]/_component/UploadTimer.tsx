'use client';

import { ChangeEventHandler, forwardRef } from 'react';

import { ValidtaionType } from '@/types/service';

import styles from './UploadTimer.module.scss';
import InputFormSvgs from '../_svgs/InputFormSvgs';
import {
  FieldErrors,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface UploadTimerProps {
  getValues: UseFormGetValues<ValidtaionType>;
  setValue: UseFormSetValue<ValidtaionType>;
  register: UseFormRegister<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const UploadTimer = forwardRef<HTMLInputElement, UploadTimerProps>(
  ({ getValues, setValue, register, errors }, ref) => {
    const validateAlertTime = () => {
      const { timeLimit_hour, timeLimit_minute, alertTime_hour, alertTime_minute } = getValues();

      const finalTime = Number(timeLimit_hour) * 60 + Number(timeLimit_minute);
      const alertTime = Number(alertTime_hour) * 60 + Number(alertTime_minute);

      return alertTime < finalTime || '중간 알림 시간은 총 발표 시간보다 클 수 없습니다.';
    };

    const validateTimeLimit = () => {
      const { timeLimit_hour, timeLimit_minute } = getValues();

      return (
        Number(timeLimit_hour) > 0 || Number(timeLimit_minute) > 0 || '총 발표 시간을 작성해주세요.'
      );
    };
    const registerOptionsForTimeLimit: RegisterOptions = {
      validate: validateTimeLimit,
    };
    const registerOptionsForAlert: RegisterOptions = {
      validate: validateAlertTime,
    };

    const onHourInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      const convertedHour = Number(value) > 12 ? 12 : Number(value);
      if (name === 'timeLimit_hour') {
        setValue('timeLimit_hour', convertedHour);
      }
      if (name === 'alertTime_hour') {
        setValue('alertTime_hour', convertedHour);
      }
    };

    const onMinuteInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      let { name, value } = e.target;
      const convertedMinute = Number(value) > 59 ? 59 : Number(value);
      if (name === 'timeLimit_minute') {
        setValue('timeLimit_minute', convertedMinute);
      }
      if (name === 'alertTime_minute') {
        setValue('alertTime_minute', convertedMinute);
      }
    };

    return (
      <div className={styles.container}>
        <p className={styles.description}>발표시간 설정</p>
        <div className={styles.inputWrapper}>
          <label htmlFor="timer" className={styles.label}>
            총 발표 시간
          </label>
          <div className={styles.timerInput}>
            {errors.timeLimit_minute && (
              <p className={styles.alarmWaring} role="alert">
                {errors.timeLimit_minute?.message}
              </p>
            )}
            <input
              type="number"
              id="timer"
              {...register('timeLimit_hour', {
                ...registerOptionsForTimeLimit,
                onChange: onHourInputChange,
              })}
              name="timeLimit_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="timer"
              {...register('timeLimit_minute', {
                ...registerOptionsForTimeLimit,
                onChange: onMinuteInputChange,
              })}
              name="timeLimit_minute"
              placeholder="00"
            />
            분
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="alert" className={styles.label}>
            중간 알림
            <InputFormSvgs>
              <InputFormSvgs.DeadlineDateDescription />
            </InputFormSvgs>
          </label>

          <div className={styles.timerInput}>
            {!errors.timeLimit_minute && errors.alertTime_minute && (
              <p className={styles.alarmWaring} role="alert">
                {errors.alertTime_minute.message}
              </p>
            )}
            <input
              type="number"
              id="alert"
              {...register('alertTime_hour', {
                ...registerOptionsForAlert,
                onChange: onHourInputChange,
              })}
              name="alertTime_hour"
              placeholder="00"
            />
            시간 &nbsp;
            <input
              type="number"
              id="alert"
              {...register('alertTime_minute', {
                ...registerOptionsForAlert,
                onChange: onMinuteInputChange,
              })}
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
