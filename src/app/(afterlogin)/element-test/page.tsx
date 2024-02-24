'use client';

import { useState } from 'react';
import { TimePickerProps } from '@/types/element';
import Checkbox from '@/app/_components/_elements/Checkbox';
import Radio from '@/app/_components/_elements/Radio';
import TimePicker from '@/app/_components/_elements/TimePicker';
import Switch from '@/app/_components/_elements/Switch';
import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import Alert from '@/app/_components/_modules/_modal/Alert';
import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';
import Modal from '@/app/_components/_modules/_modal/Modal';

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isUsedAlarm, setIsUsedAlarm] = useState(false);
  const [time, setTime] = useState<TimePickerProps['selectedValue']>('0');
  const [radioValue, setRadioValue] = useState(1);
  const alert = useToggle();
  const alert2 = useToggle();
  const confirm = useToggle();
  const modal = useToggle();

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

  const handleOnClickModal = () => {
    alert.onOpen();
  };

  const handleAlertModal = () => {
    console.log('alert...');
    // modal.onClose();
    alert2.onOpen();
  };

  return (
    <>
      <div>
        <Checkbox _label="가능여부" checked={isAvailable} onChange={handleOnChange}></Checkbox>
        <Switch
          _activedLabel
          _label="알람? (acteved label)"
          checked={isUsedAlarm}
          onChange={handleOnChangeAlarm}
        ></Switch>
        <Switch _label="알람?" checked={isUsedAlarm} onChange={handleOnChangeAlarm}></Switch>
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

      <div>
        <span>alert test</span>
        <button onClick={handleOnClickModal}>click here</button>
        <Alert
          context={alert}
          title="Alert Test"
          message="testing alert right now..!"
          onActionClick={handleAlertModal}
        />
        <Alert context={alert2} title="alert 2" message="testing layer" />
      </div>

      <div>
        <span>confirm test</span>
        <button
          onClick={() => {
            confirm.onOpen();
          }}
        >
          open confirm !!
        </button>
        <Confirm
          context={confirm}
          title="Confirm Test"
          message="testing confirm ~~!"
          onOkayClick={() => {
            console.log('okay okay ~');
            confirm.onClose();
          }}
        />
      </div>

      <div>
        <span>custom modal test</span>
        <button
          onClick={() => {
            modal.onOpen();
          }}
        >
          open modal !!
        </button>
        <Modal context={modal} size="sm">
          <span>안녕?</span>
        </Modal>
      </div>
    </>
  );
}
