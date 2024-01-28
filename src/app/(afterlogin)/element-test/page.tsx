'use client';

import Checkbox from '@/app/_components/_elements/Checkbox';
import TimePicker from '@/app/_components/_elements/TimePicker';
import ToggleButton from '@/app/_components/_elements/ToggleButton';
import { TimePickerProps } from '@/types/element';
import { useState } from 'react';

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isUsedAlarm, setIsUsedAlarm] = useState(false);
  const [time, setTime] = useState<TimePickerProps['selectedValue']>('0');

  const handleOnChange = () => {
    setIsAvailable(!isAvailable);
  };

  const handleOnChangeAlarm = () => {
    setIsUsedAlarm(!isUsedAlarm);
  };

  const handleOnChangeTime = (newTime: TimePickerProps['selectedValue']) => {
    setTime(newTime);
  };

  return (
    <>
      <div>
        <Checkbox _label="가능여부" _isChecked={isAvailable} onChange={handleOnChange}></Checkbox>
        <ToggleButton
          _label="알람? (acteved label)"
          _isChecked={isUsedAlarm}
          _activedLabel
          onChange={handleOnChangeAlarm}
        ></ToggleButton>
        <ToggleButton
          _label="알람?"
          _isChecked={isUsedAlarm}
          onChange={handleOnChangeAlarm}
        ></ToggleButton>
      </div>
      <div>
        <TimePicker
          type="hour"
          gap={3}
          selectedValue={time}
          onChange={handleOnChangeTime}
        ></TimePicker>
        <span>time : {time}</span>
      </div>
    </>
  );
}
