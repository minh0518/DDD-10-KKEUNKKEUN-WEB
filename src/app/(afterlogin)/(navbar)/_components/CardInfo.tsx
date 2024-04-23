'use client';

import { PresentationListType } from '@/types/service';
import styles from './CardInfo.module.scss';
import { ElementType } from 'react';
import HomeCardDescription from './_Home/HomeCardDescription';

interface Props {
  presentation: PresentationListType['page']['content'][0];
  usage: 'home' | 'feedback';
}
const CardInfo = ({ presentation, usage }: Props) => {
  return (
    <div className={styles.info}>
      <span className={styles.info__title}>{presentation.title}</span>
      {usage === 'home' ? <HomeCardDescription presentation={presentation} /> : <></>}
      {/* <span className={styles.info__desc}>
        D{presentation.dday < 0 ? `+${Math.abs(presentation.dday)}` : `-${presentation.dday}`}
        <em className={styles.info__division}></em>
        발표 시간 {presentation.timeLimit.hours * 60 + presentation.timeLimit.minutes}분
      </span> */}
    </div>
  );
};

export default CardInfo;
