import { TimePickerProps } from '@/types/element';
import { ChangeEvent } from 'react';

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

const getTimeList = (min: number, max: number, gap: number) => {
  if (max - min < gap) return [];

  return Array.from({ length: (max - min) / gap + 1 }, (_, i) => (min + i * gap).toString());
};

export default TimePicker;
