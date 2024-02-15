'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './ExerciseItem.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';
import MenuIcon from './_svgs/MenuIcon';
import ModifyIcon from './_svgs/ModifyIcon';
import DeleteIcon from './_svgs/DeleteIcon';

const ExerciseItem = () => {
  return (
    <article className={styles.container}>
      <div className={styles.thumbnail}>
        <div className={styles.menu}>
          <FlyoutMenu>
            <FlyoutMenu.ToggleButton>
              <MenuIcon />
            </FlyoutMenu.ToggleButton>
            <FlyoutMenu.MenuList>
              <FlyoutMenu.MenuItem>
                <ModifyIcon />
                <span>수정</span>
              </FlyoutMenu.MenuItem>
              <FlyoutMenu.MenuItem>
                <DeleteIcon />
                <span>삭제</span>
              </FlyoutMenu.MenuItem>
            </FlyoutMenu.MenuList>
          </FlyoutMenu>
        </div>
      </div>
      <div className={styles.info__box}>
        <div className={styles.info}>
          <ExerciseInfo />
        </div>
        <div className={styles.action__box}>
          <button className={styles.action}>연습하기</button>
        </div>
      </div>
    </article>
  );
};

export default ExerciseItem;
