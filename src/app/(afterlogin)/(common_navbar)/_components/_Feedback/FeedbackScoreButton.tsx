import React from 'react';
import styles from './FeedbackScoreButton.module.scss';
import { FeedbackListType } from '@/types/service';

interface Props {
  status: FeedbackListType['page']['content'][0]['status'];
  score: number;
  onClick: () => void;
}

const FeedbackScoreButton = ({ status, score, onClick }: Props) => {
  const getFeedBackScore = () => {
    if (status === 'DONE') {
      return `${score}점`;
    }
    if (status === 'IN_PROGRESS') {
      return `채점중`;
    }
  };
  return (
    <div className={styles.action__box}>
      {status !== 'FAIL' && (
        <button
          className={styles.action}
          onClick={() => {
            status === 'DONE' && onClick();
          }}
        >
          {getFeedBackScore()}
        </button>
      )}
    </div>
  );
};

export default FeedbackScoreButton;
