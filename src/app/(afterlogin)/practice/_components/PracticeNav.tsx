import classNames from 'classnames/bind';

import LogoIcon from '@/app/_svgs/LogoIcon';
import RecordIcon from '../_svgs/RecordIcon';
import CloseIcon from '../../../_svgs/CloseIcon';

import styles from './PracticeNav.module.scss';
import Timer from './Timer';

interface Props {
  /** 발표 제목 */
  title: string;
  /** 녹음 진행 여부 */
  isRecording: boolean;
  /** 마지막 페이지 여부 */
  isLastSlide: boolean;
  /** 발표 시간 */
  practiceTime: {
    hours: number;
    minutes: number;
  };
  /** 다음 페이지 이동 함수 */
  goToNext: () => void;
  /** 녹음 핸들러 */
  handleRecording: () => void;
  /** 닫기 버튼 클릭 이벤트 */
  onCloseClick: () => void;
}

const PracticeNav = ({
  title,
  isRecording,
  isLastSlide,
  practiceTime,
  goToNext,
  handleRecording,
  onCloseClick,
}: Props) => {
  const cx = classNames.bind(styles);

  return (
    <nav
      className={cx('container', isRecording ? 'container--record-on' : 'container--record-off')}
    >
      <div className={styles.contents__box}>
        <div className={cx(['contents', 'contents--left'])}>
          <LogoIcon />
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={cx(['contents', 'contents--center'])}>
          <button className={styles.recorder} onClick={handleRecording}>
            <RecordIcon isRecording={isRecording} />
          </button>
          <em className={styles.division}></em>
          <Timer
            isRecording={isRecording}
            maxHours={practiceTime.hours}
            maxMinutes={practiceTime.minutes}
          />
        </div>
        <div className={cx(['contents', 'contents--right'])}>
          {isRecording && !isLastSlide && (
            <button type="submit" className={cx('action--next')} onClick={goToNext}>
              다음 페이지
            </button>
          )}
          {isLastSlide && (
            <button type="submit" className={cx('action--next')} onClick={goToNext}>
              발표 종료
            </button>
          )}
          <button className={cx('action--close')} onClick={onCloseClick}>
            <CloseIcon color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PracticeNav;
