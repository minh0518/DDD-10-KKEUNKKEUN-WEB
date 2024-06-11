import React from 'react';
import styles from './EmptyFeedback.module.scss';
import Link from 'next/link';

const EmptyFeedback = () => {
  return (
    <div className={styles.container}>
      <p>아직 연습할 발표가 없네요!</p>
      <p>완성도 있는 발표를 위해 연습을 시작해볼까요?</p>
      <Link href={'/upload/new'}>발표 연습 시작하기</Link>
    </div>
  );
};

export default EmptyFeedback;
