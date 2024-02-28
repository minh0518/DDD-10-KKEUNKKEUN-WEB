import classNames from 'classnames/bind';

import LogoIcon from '@/app/_svgs/LogoIcon';
import RecordOnIcon from '../_svgs/RecordOnIcon';
import CloseIcon from '../_svgs/CloseIcon';

import styles from './PracticeNav.module.scss';

const PracticeNav = () => {
  const cx = classNames.bind(styles);

  return (
    <nav className={styles.container}>
      <div className={styles.contents__box}>
        <div className={cx(['contents', 'contents--left'])}>
          <LogoIcon />
          <h3 className={styles.title}>발표이름 발표이름 발표이름 발표이름 발표이름 발표이름</h3>
        </div>
        <div className={cx(['contents', 'contents--center'])}>
          <RecordOnIcon />
          <em className={styles.division}></em>
          <h2>15:00</h2>
        </div>
        <div className={cx(['contents', 'contents--right'])}>
          <button className={cx('action--next')}>다음 페이지</button>
          <button className={cx('action--close')}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PracticeNav;
