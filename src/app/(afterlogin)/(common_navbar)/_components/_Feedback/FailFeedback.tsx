import React from 'react';
import styles from './FailFeedback.module.scss';
import { IoIosWarning } from 'react-icons/io';
const FailFeedback = () => {
  return (
    <div className={styles.container}>
      <IoIosWarning size={60} />
      <h3>피드백 데이터 생성에 실패했습니다.</h3>
    </div>
  );
};

export default FailFeedback;
