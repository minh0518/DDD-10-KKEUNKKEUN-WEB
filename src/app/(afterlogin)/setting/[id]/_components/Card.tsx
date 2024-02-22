'use client';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import { ContentType } from './SettingProcess';

interface CardProps {
  title: string;
  content: string[];
  setDevice?: () => void;
  setMode?: () => void;
  selected: boolean;
}

const cx = classNames.bind(styles);

const Card = ({ title, content, setDevice, setMode, selected }: CardProps) => {
  return (
    <div
      className={cx(['container', selected && 'selected'])}
      onClick={() => {
        if (setDevice) setDevice();
        if (setMode) setMode();
      }}
    >
      <div className={styles.image}>Image</div>
      <h2 className={cx(['title', selected && 'selected'])}>{title}</h2>
      {content.map((sentence, index) => (
        <h3 className={styles.content} key={index}>
          {sentence}
        </h3>
      ))}
    </div>
  );
};

export default Card;
