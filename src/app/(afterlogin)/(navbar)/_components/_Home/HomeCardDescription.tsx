import React from 'react';
import styles from './HomeCardDescription.module.scss';
import { PresentationListType } from '@/types/service';

interface Props {
  presentation?: PresentationListType['page']['content'][0];
}

const HomeCardDescription = ({ presentation }: Props) => {
  return (
    presentation && (
      <span className={styles.desc}>
        D{presentation.dday < 0 ? `+${Math.abs(presentation.dday)}` : `-${presentation.dday}`}
        <em className={styles.division}></em>
        발표 시간 {presentation.timeLimit.hours * 60 + presentation.timeLimit.minutes}분
      </span>
    )
  );
};

export default HomeCardDescription;
