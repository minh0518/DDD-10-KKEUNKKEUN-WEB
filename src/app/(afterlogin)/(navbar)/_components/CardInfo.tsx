'use client';

import { CardListType } from '@/types/service';
import styles from './CardInfo.module.scss';

import HomeCardDescription from './_Home/HomeCardDescription';
import { PresentationListTypeGuard } from '@/types/guards';

interface Props {
  listInfo: CardListType;
  usage: 'home' | 'feedback';
}
const CardInfo = ({ listInfo, usage }: Props) => {
  return (
    <div className={styles.info}>
      <span className={styles.info__title}>{listInfo.title}</span>
      {usage === 'home' && PresentationListTypeGuard(listInfo) ? (
        <>
          <HomeCardDescription listInfo={listInfo} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardInfo;
