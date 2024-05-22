import React from 'react';
import SpeedChart from './_charts/SpeedChart';
import BadIcon from '../_svgs/BadIcon';
import { FeedbackInfoType } from '@/types/service';
import styles from './SpeedFeedback.module.scss';
import GoodIcon from '../_svgs/GoodIcon';

interface Props {
  speedData: FeedbackInfoType['speedFeedback'];
}
const SpeedFeedback = ({ speedData }: Props) => {
  return (
    <div className={styles.container}>
      <SpeedChart grade={speedData.grade} />
      <div className={styles.description}>
        {speedData.grade === 'Good' ? <GoodIcon /> : <BadIcon />}
        <h1>{speedData.title}</h1>
        <p>{speedData.description}</p>
      </div>
    </div>
  );
};

export default SpeedFeedback;
