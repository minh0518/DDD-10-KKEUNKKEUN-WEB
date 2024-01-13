'use client';

import List from '@/app/_components/_elements/List';
import Button from '@/app/_components/_elements/Button';

import styles from './LoginMenus.module.scss';

import { ListInfoType } from '@/types/common';

const LoginMenus = () => {
  const listArr: ListInfoType = [
    {
      content: (
        <Button content="회원가입" _className={styles.menuButton} _onClick={() => {}}></Button>
      ),
    },
    {
      content: (
        <Button content="아이디 찾기" _className={styles.menuButton} _onClick={() => {}}></Button>
      ),
    },
    {
      content: (
        <Button content="비밀번호 찾기" _className={styles.menuButton} _onClick={() => {}}></Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <List listArr={listArr} />
      </ul>
    </div>
  );
};

export default LoginMenus;
