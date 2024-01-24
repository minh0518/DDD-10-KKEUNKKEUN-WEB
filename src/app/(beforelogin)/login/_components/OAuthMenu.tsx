'use client';

import styles from './OAuthMenu.module.scss';

import { ListProp } from '@/types/element';

import List from '@/app/_components/_elements/List';
import Button from '@/app/_components/_elements/Button';

const OAuthMenu = () => {
  const TmpSvg = (
    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18.5" cy="18" r="18" fill="#D9D9D9" />
    </svg>
  );
  const listArr: ListProp = [
    {
      _content: (
        <Button _content={TmpSvg} _className={styles.authButtons} onClick={() => {}}></Button>
      ),
      // style: { backgroundColor: 'blue' },
    },
    {
      _content: (
        <Button _content={TmpSvg} _className={styles.authButtons} onClick={() => {}}></Button>
      ),
    },
    {
      _content: (
        <Button _content={TmpSvg} _className={styles.authButtons} onClick={() => {}}></Button>
      ),
    },
    {
      _content: (
        <Button _content={TmpSvg} _className={styles.authButtons} onClick={() => {}}></Button>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <ul className={styles.authButtonList}>
        <List listArr={listArr} />
      </ul>
    </div>
  );
};

export default OAuthMenu;
