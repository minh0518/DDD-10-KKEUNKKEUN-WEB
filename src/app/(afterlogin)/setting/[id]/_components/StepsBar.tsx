'use client';

import StepNumbers from './StepNumbers';
import styles from './StepsBar.module.scss';

interface StepsBarProps {
  current: number;
}
const StepsBar = ({ current }: StepsBarProps) => {
  const steps = [
    { number: 1, label: '연습 모드 설정' },
    { number: 2, label: '외울 문장 설정' },
    { number: 3, label: '발표 연습 시작' },
  ];
  return (
    <div className={styles.container}>
      {steps.map((i) => {
        return <StepNumbers key={i.number} number={i.number} label={i.label} current={current} />;
      })}
    </div>
  );
};

export default StepsBar;
