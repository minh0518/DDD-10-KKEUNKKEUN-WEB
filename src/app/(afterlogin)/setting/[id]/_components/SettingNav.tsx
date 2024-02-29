import LogoIcon from '@/app/_svgs/LogoIcon';

import styles from './SettingNav.module.scss';
import CloseIconWhite from '@/app/_svgs/CloseIconWhite';
import classNames from 'classnames';
import CancelButton from './CancelButton';

const SettingNav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LogoIcon />
          <button
            className={classNames([styles.presentationList, styles.clicked])}
            name="presentationList"
          >
            발표 목록
          </button>
        </div>

        <div className={styles.right}>
          <CancelButton>
            <CloseIconWhite />
          </CancelButton>
        </div>
      </div>
    </nav>
  );
};

export default SettingNav;
