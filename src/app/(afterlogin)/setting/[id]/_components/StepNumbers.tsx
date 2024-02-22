import styles from './StepNumbers.module.scss';
import classNames from 'classnames/bind';

interface StepNumbersProps {
  number: number;
  label: string;
  current: number; // 배열 인덱스
}

const cx = classNames.bind(styles);

const StepNumbers = ({ number, label, current }: StepNumbersProps) => {
  return (
    <div className={styles.container}>
      {number !== 1 && <line className={cx(['line', current + 1 >= number && 'selected'])} />}
      <div className={cx(['number', current + 1 >= number && 'selected'])}>{number}</div>
      <p className={cx(['label', current + 1 >= number && 'selected'])}>{label}</p>
    </div>
  );
};

export default StepNumbers;
