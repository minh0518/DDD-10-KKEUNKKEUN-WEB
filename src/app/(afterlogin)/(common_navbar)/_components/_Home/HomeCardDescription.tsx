import React from 'react';
import styles from './HomeCardDescription.module.scss';
import { CardListType } from '@/types/service';
import { PresentationListTypeGuard } from '@/types/guards';

interface Props {
  listInfo: CardListType;
}

const HomeCardDescription = ({ listInfo }: Props) => {
  return (
    listInfo &&
    PresentationListTypeGuard(listInfo) && (
      <span className={styles.desc}>
        D{listInfo.dday < 0 ? `+${Math.abs(listInfo.dday)}` : `-${listInfo.dday}`}
        <em className={styles.division}></em>
        발표 시간 {listInfo.timeLimit.hours * 60 + listInfo.timeLimit.minutes}분
      </span>
    )
  );
};

export default HomeCardDescription;
