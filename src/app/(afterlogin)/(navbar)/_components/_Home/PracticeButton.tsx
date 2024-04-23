import React from 'react';
import styles from './PracticeButton.module.scss';

interface Props {
  onClick: () => void;
}
const PracticeButton = ({ onClick }: Props) => {
  return (
    <div className={styles.action__box}>
      <button className={styles.action} onClick={onClick}>
        연습하기
      </button>
    </div>
  );
};

export default PracticeButton;
