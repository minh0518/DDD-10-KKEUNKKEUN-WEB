import { Value } from '@/types/service';
import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './CustomCalendar.scss';

interface CustomCalendarProps {
  today: Date;
  date: Value;
  setDate: Dispatch<SetStateAction<Value>>;
  setIsCalenderOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomCalendar = ({ today, date, setDate, setIsCalenderOpen }: CustomCalendarProps) => {
  return (
    <div className="calendarContainer">
      <Calendar
        onChange={setDate}
        value={date}
        minDetail="decade"
        minDate={today}
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        formatYear={(locale, date) => moment(date).format('YYYY')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
        formatDay={(locale, date) => moment(date).format('DD')}
        onClickDay={() => {
          setIsCalenderOpen(false);
        }}
      />
    </div>
  );
};

export default CustomCalendar;
