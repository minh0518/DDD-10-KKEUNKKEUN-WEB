'use client';

import { useState } from 'react';
import { TimePickerProps } from '@/types/element';
import Checkbox from '@/app/_components/_elements/Checkbox';
import Radio from '@/app/_components/_elements/Radio';
import TimePicker from '@/app/_components/_elements/TimePicker';
import ToggleButton from '@/app/_components/_elements/ToggleButton';
import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './page.module.scss';

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isUsedAlarm, setIsUsedAlarm] = useState(false);
  const [time, setTime] = useState<TimePickerProps['selectedValue']>('0');
  const [radioValue, setRadioValue] = useState(1);

  const handleOnChange = () => {
    setIsAvailable(!isAvailable);
  };

  const handleOnChangeAlarm = () => {
    setIsUsedAlarm(!isUsedAlarm);
  };

  const handleOnChangeTime = (newTime: TimePickerProps['selectedValue']) => {
    setTime(newTime);
  };

  const handleOnChangeRadio = (newValue: any) => {
    setRadioValue(newValue);
  };

  return (
    <>
      <div>
        <Checkbox _label="가능여부" checked={isAvailable} onChange={handleOnChange}></Checkbox>
        <ToggleButton
          _activedLabel
          _label="알람? (acteved label)"
          checked={isUsedAlarm}
          onChange={handleOnChangeAlarm}
        ></ToggleButton>
        <ToggleButton
          _label="알람?"
          checked={isUsedAlarm}
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
      <div>
        <Radio
          id="radio1"
          value={1}
          name="test_radio"
          _label="항목1"
          _selectedValue={radioValue}
          _onChangeSelected={handleOnChangeRadio}
        />
        <Radio
          id="radio2"
          value={2}
          name="test_radio"
          _label="항목2"
          _selectedValue={radioValue}
          _onChangeSelected={handleOnChangeRadio}
        />
        <Radio
          id="radio3"
          value={3}
          name="test_radio"
          _label="항목3"
          _selectedValue={radioValue}
          _onChangeSelected={handleOnChangeRadio}
        />
        <span>selected : {radioValue}</span>
      </div>
      <div>
        <span>Flyout menu test</span>
        <FlyoutMenu>
          <FlyoutMenu.ToggleButton>
            <div style={{ width: '50px', height: '50px', background: 'tomato' }}>click!</div>
          </FlyoutMenu.ToggleButton>
          <FlyoutMenu.MenuList>
            <FlyoutMenu.MenuItem>apple</FlyoutMenu.MenuItem>
            <FlyoutMenu.MenuItem>banana</FlyoutMenu.MenuItem>
            <FlyoutMenu.MenuItem>cat</FlyoutMenu.MenuItem>
          </FlyoutMenu.MenuList>
        </FlyoutMenu>
      </div>
    </>
  );
}
