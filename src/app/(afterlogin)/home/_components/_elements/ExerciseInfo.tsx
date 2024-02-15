import styles from './ExerciseInfo.module.scss';

const ExerciseInfo = () => {
  return (
    <div className={styles.info}>
      <span className={styles.info__title}>발표 이름 발표 이름 발표 이름 발표 이름</span>
      <span className={styles.info__desc}>
        D-3
        <em className={styles.info__division}></em>
        발표 시간 3분
      </span>
    </div>
  );
};

export default ExerciseInfo;
