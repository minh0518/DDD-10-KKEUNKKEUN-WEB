import { useEffect, useState } from 'react';

interface Props {
  /** 발표 시작 여부 */
  isRecording: boolean;
  /** 최대 시간 값 */
  maxHours: number;
  /** 최대 분 값 */
  maxMinutes: number;
}

const Timer = ({ isRecording, maxHours, maxMinutes }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setHours(maxHours);
    setMinutes(maxMinutes);
  }, [maxHours, maxMinutes]);

  useEffect(() => {
    if (isRecording) {
      let timer = setInterval(() => {
        // 시간, 분, 초가 모두 0이라면 타이머를 멈춤
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
        }
        // 초가 0이고 분과 시간이 0이 아니라면 시간과 분을 조절하고 초를 59로 설정
        else if (seconds === 0 && minutes !== 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
          if (minutes === 0 && hours !== 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
          }
        }
        // 초가 0이 아니라면 초를 하나 줄임
        else if (seconds !== 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);

      // 컴포넌트가 언마운트될 때 타이머 정리
      return () => {
        clearInterval(timer);
      };
    }
  }, [isRecording, hours, minutes, seconds]); // hours, minutes, seconds 상태가 변경될 때마다 useEffect 호출

  // 시간을 두 자리 수로 포맷하는 함수
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <h2>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </h2>
  );
};

export default Timer;
