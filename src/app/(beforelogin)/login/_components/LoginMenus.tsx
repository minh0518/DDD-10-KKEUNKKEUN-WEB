'use client';

import List from '@/app/_components/_elements/List';
import Button from '@/app/_components/_elements/Button';

import styles from './LoginMenus.module.scss';

import { ListProps } from '@/types/element';

const LoginMenus = () => {
  const listArr: ListProps = [
    {
      _content: (
        <Button _content="회원가입" _className={styles.menuButton} onClick={() => {}}></Button>
      ),
      // style: { backgroundColor: 'blue' },
    },
    {
      _content: (
        <Button _content="아이디 찾기" _className={styles.menuButton} onClick={() => {}}></Button>
      ),
    },
    {
      _content: (
        <Button _content="비밀번호 찾기" _className={styles.menuButton} onClick={() => {}}></Button>
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
