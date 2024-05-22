import { FeedbackListTypeGuard } from '@/types/guards';
import { CardListType } from '@/types/service';
import styles from './FeedbackCardDescription.module.scss';

interface Props {
  listInfo: CardListType;
}

const FeedbackCardDescription = ({ listInfo }: Props) => {
  return (
    listInfo &&
    FeedbackListTypeGuard(listInfo) && (
      <p className={styles.generateDate}>{listInfo.practiceDate}</p>
    )
  );
};

export default FeedbackCardDescription;
