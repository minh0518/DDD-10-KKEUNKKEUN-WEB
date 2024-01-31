import { ChangeEvent } from 'react';
import { TimePickerProps } from '@/types/element';
import { getTimeList } from '@/app/_utils/element';

const TimePicker = ({ type, min, max, gap, selectedValue, onChange }: TimePickerProps) => {
  const isHour = type === 'hour';
  const minTime = min ?? 0;
  const maxTime = max ?? (isHour ? 23 : 59);
  const gapTime = gap ?? (isHour ? 1 : 30);

  const timeList = getTimeList(minTime, maxTime, gapTime);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = timeList.find((time) => time === e.target.value);
    if (selectedOption) onChange(selectedOption);
  };

  return (
    <>
      <select value={selectedValue} onChange={handleOnChange}>
        {timeList.map((time, idx) => (
          <option value={time} key={idx}>
            {time}
          </option>
        ))}
      </select>
    </>
  );
};

export default TimePicker;
