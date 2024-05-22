import React from 'react';
import styles from './FeedbackScoreButton.module.scss';
import { FeedbackListType } from '@/types/service';

interface Props {
  status: FeedbackListType['page']['content'][0]['status'];
  score: number;
  onClick: () => void;
}

const FeedbackScoreButton = ({ status, score, onClick }: Props) => {
  return (
    <div className={styles.action__box}>
      <button
        className={styles.action}
        onClick={() => {
          status === 'DONE' && onClick();
        }}
      >
        {status === 'DONE' ? `${score}점` : '채점중'}
      </button>
    </div>
  );
};

export default FeedbackScoreButton;
