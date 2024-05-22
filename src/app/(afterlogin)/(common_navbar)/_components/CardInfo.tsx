'use client';

import { CardListType } from '@/types/service';
import styles from './CardInfo.module.scss';

import HomeCardDescription from './_Home/HomeCardDescription';
import { PresentationListTypeGuard } from '@/types/guards';
import { usePathname } from 'next/navigation';
import FeedbackCardDescription from './_Feedback/FeedbackCardDescription';

interface Props {
  listInfo: CardListType;
}
const CardInfo = ({ listInfo }: Props) => {
  const pathname = usePathname();
  const usage: 'feedback' | 'home' = pathname === `/feedback/list` ? 'feedback' : 'home';
  return (
    <div className={styles.info}>
      <span className={styles.info__title}>{listInfo.title}</span>
      {usage === 'home' && PresentationListTypeGuard(listInfo) ? (
        <HomeCardDescription listInfo={listInfo} />
      ) : (
        <FeedbackCardDescription listInfo={listInfo} />
      )}
    </div>
  );
};

export default CardInfo;
