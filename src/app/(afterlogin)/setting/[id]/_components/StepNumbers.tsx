import styles from './StepNumbers.module.scss';
import classNames from 'classnames/bind';

interface StepNumbersProps {
  number: number;
  label: string;
  currentStep: number; // 배열 인덱스
}

const cx = classNames.bind(styles);

const StepNumbers = ({ number, label, currentStep }: StepNumbersProps) => {
  return (
    <div className={styles.container}>
      {number !== 1 && <div className={cx(['line', currentStep + 1 >= number && 'selected'])} />}
      <div className={cx(['number', currentStep + 1 >= number && 'selected'])}>{number}</div>
      <p className={cx(['label', currentStep + 1 >= number && 'selected'])}>{label}</p>
    </div>
  );
};

export default StepNumbers;
