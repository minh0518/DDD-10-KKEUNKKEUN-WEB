import ExerciseItem from './ExerciseItem';
import styles from './ExerciseList.module.scss';
import PlusIcon from './_svgs/PlusIcon';

const ExerciseList = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>내 발표연습 목록</h3>
      <ul className={styles.exercise__box}>
        {Array.from({ length: 10 }, (_, i) => i).map((v) => (
          <li className={styles.exercise}>
            <ExerciseItem />
          </li>
        ))}
        <button className={styles.exercise__new}>
          <PlusIcon />
          <span>새 발표 추가하기</span>
        </button>
      </ul>
    </section>
  );
};

export default ExerciseList;
