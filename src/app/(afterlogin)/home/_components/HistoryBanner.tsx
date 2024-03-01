import { PresentationListType } from '@/types/service';
import styles from './HistoryBanner.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  presentation: PresentationListType['page']['content'][0];
}
const HistoryBanner = ({ presentation }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.history}>
        <h2 className={styles.history__title}>최근에 진행한 발표 연습</h2>
        <div className={styles.history__contents}>
          <div className={styles.presentation__thumbnail}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${presentation.thumbnailPath}`}
              width={165}
              height={90}
              alt="최근 발표 이미지"
            />
          </div>
          <ExerciseInfo presentation={presentation} />
        </div>
      </div>
      <div className={styles.action__box}>
        <button className={styles.action}>
          <Link href={`/setting/${presentation.id}`}>연습 시작하기</Link>
        </button>
      </div>
    </section>
  );
};

export default HistoryBanner;
