'use client';
import React, { useState } from 'react';
import styles from './PracticeButton.module.scss';
import { useStartPresentation } from '../../home/_hooks/presentationList';

interface Props {
  id: number;
}
const PracticeButton = ({ id }: Props) => {
  const [start, setStart] = useState(false);

  useStartPresentation(id, start);
  return (
    <div className={styles.action__box}>
      <button className={styles.action} onClick={() => setStart(true)}>
        연습하기
      </button>
    </div>
  );
};

export default PracticeButton;
