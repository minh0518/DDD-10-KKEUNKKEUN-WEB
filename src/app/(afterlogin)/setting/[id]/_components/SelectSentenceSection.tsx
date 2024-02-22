'use client';
import DragSection from './DragSection';
import styles from './SelectSentenceSection.module.scss';

const SelectSentenceSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pptImageSection}>
        <div className={styles.image}>Image</div>
        <div className={styles.movePptButtons}>
          <button className={styles.moveButton}>이전 페이지</button>
          <button className={styles.moveButton}>다음 페이지</button>
        </div>
      </div>
      <DragSection />
    </div>
  );
};

export default SelectSentenceSection;
