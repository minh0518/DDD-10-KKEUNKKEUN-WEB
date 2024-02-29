'use client';

import ExerciseList from './_components/ExerciseList';
import HistoryBanner from './_components/HistoryBanner';
import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.container}>
      <HistoryBanner />
      <ExerciseList />
    </div>
  );
}
