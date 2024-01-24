'use client';

import Checkbox from '@/app/_components/_elements/Checkbox';
import ToggleButton from '@/app/_components/_elements/ToggleButton';
import { useState } from 'react';

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isUsedAlarm, setIsUsedAlarm] = useState(false);

  const handleOnChange = () => {
    setIsAvailable(!isAvailable);
  };

  const handleOnChangeAlarm = () => {
    setIsUsedAlarm(!isUsedAlarm);
  };

  return (
    <div>
      <Checkbox _label="가능여부" _isChecked={isAvailable} _onChange={handleOnChange}></Checkbox>
      <ToggleButton
        _label="알람? (acteved label)"
        _isChecked={isUsedAlarm}
        _onChange={handleOnChangeAlarm}
        _activedLabel
      ></ToggleButton>
      <ToggleButton
        _label="알람?"
        _isChecked={isUsedAlarm}
        _onChange={handleOnChangeAlarm}
      ></ToggleButton>
    </div>
  );
}
