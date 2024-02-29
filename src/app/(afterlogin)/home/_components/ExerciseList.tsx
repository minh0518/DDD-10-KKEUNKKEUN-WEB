import ExerciseItem from './ExerciseItem';
import styles from './ExerciseList.module.scss';
import PlusIcon from './_svgs/PlusIcon';

const ExerciseList = () => {
  return (
    <section className={styles.container}>
      <h2>내 발표연습 목록</h2>
      <ul className={styles.exercise__box}>
        {Array.from({ length: 10 }, (_, i) => i).map((v, index) => (
          <li className={styles.exercise} key={index}>
            {/* TODO: 실제 id 값으로 변경 */}
            <ExerciseItem id={v} />
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
