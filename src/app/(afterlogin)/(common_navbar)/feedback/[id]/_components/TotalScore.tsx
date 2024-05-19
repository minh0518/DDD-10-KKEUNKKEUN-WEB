import styles from './TotalScore.module.scss';
import GoodIcon from '../_svgs/GoodIcon';
import GoalIcon from '../_svgs/GoalIcon';
import ScoreIcon from '../_svgs/ScoreIcon';
import Link from 'next/link';
const TotalScore = () => {
  return (
    <div>
      <h2>발표 제목 종합 피드백</h2>
      <div className={styles.content}>
        <div className={styles.total_result}>
          <GoodIcon />
          <h1>
            잘 하고 있어요! 종합 점수 <span className={styles.highlight_score}>00점</span>을
            달성했어요 👏
          </h1>
          <p>목표 달성까지 0점 남았어요, 조금만 더 파이팅!</p>
        </div>
        <div className={styles.total_score}>
          <div className={styles.blank_first} />
          <div className={styles.blank_second} />
          <div className={styles.goal}>
            <GoalIcon />
          </div>
          {/* <div className={styles.score}>
            <ScoreIcon />
          </div> */}
        </div>
        <div>
          <Link className={styles.practice_Link} href="#">
            <h2>발표 연습 시작하기</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TotalScore;
