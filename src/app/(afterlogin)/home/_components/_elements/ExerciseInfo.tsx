'use client';

import { PresentationListType } from '@/types/service';
import styles from './ExerciseInfo.module.scss';

interface Props {
  presentation: PresentationListType['page']['content'][0];
}
const ExerciseInfo = ({ presentation }: Props) => {
  return (
    <div className={styles.info}>
      <span className={styles.info__title}>{presentation.title}</span>
      <span className={styles.info__desc}>
        D{presentation.dday < 0 ? `+${Math.abs(presentation.dday)}` : `-${presentation.dday}`}
        <em className={styles.info__division}></em>
        발표 시간 {presentation.timeLimit.hours * 60 + presentation.timeLimit.minutes}분
      </span>
    </div>
  );
};

export default ExerciseInfo;
