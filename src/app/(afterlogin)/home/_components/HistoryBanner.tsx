import styles from './HistoryBanner.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';

const HistoryBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.history}>
        <h2 className={styles.history__title}>최근에 진행한 발표 연습</h2>
        <div className={styles.history__contents}>
          <div className={styles.presentation__thumbnail}>이미지</div>
          <ExerciseInfo />
        </div>
      </div>
      <div className={styles.action__box}>
        <button className={styles.action}>연습 시작하기</button>
      </div>
    </section>
  );
};

export default HistoryBanner;
