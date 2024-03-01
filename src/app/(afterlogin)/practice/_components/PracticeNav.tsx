import classNames from 'classnames/bind';

import LogoIcon from '@/app/_svgs/LogoIcon';
import RecordIcon from '../_svgs/RecordIcon';
import CloseIcon from '../../../_svgs/CloseIcon';

import styles from './PracticeNav.module.scss';

interface Props {
  /** 발표 제목 */
  title: string;
  /** 녹음 진행 여부 */
  isRecording: boolean;
  /** 다음 페이지 이동 함수 */
  goToNext: () => void;
  /** 녹음 핸들러 */
  handleRecording: () => void;
  /** 닫기 버튼 클릭 이벤트 */
  onCloseClick: () => void;
}

const PracticeNav = ({ title, isRecording, goToNext, handleRecording, onCloseClick }: Props) => {
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
          <h2>15:00</h2>
        </div>
        <div className={cx(['contents', 'contents--right'])}>
          {isRecording && (
            <button className={cx('action--next')} onClick={goToNext}>
              다음 페이지
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
