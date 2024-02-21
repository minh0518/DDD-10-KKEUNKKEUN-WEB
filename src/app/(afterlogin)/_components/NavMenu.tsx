'use client';

import { MouseEventHandler, useState } from 'react';

import styles from './Navbar.module.scss';
import classNames from 'classnames';

import { fetch_ClientAuth } from '@/services/client/fetchClient';
import { ERROR_MESSAGE } from '@/config/const';

type ClickedList = 'presentationList' | 'report';

const isClickedList = (name: string): name is ClickedList => {
  return name === 'presentationList' || name === 'report';
};

const NavMenu = () => {
  const [clicked, setClicked] = useState<ClickedList>('presentationList');

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget;

    if (isClickedList(name)) setClicked(name);
  };

  // 테스트용
  const tmpReIssueTest = async () => {
    const nextServerUrl = `${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/auth/slient`;
    const clientUrl = `/api/accounts/reissue`;
    await fetch(clientUrl, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
    });
  };

  // 테스트용
  const tmpMyInfoTest = async () => {
    try {
      const clientUrl = `/api/accounts/me`;
      const res = await fetch_ClientAuth(clientUrl, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(ERROR_MESSAGE.USER.ERROR);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      <button
        className={classNames([clicked === 'presentationList' && styles.clicked])}
        name="presentationList"
        onClick={onClick}
      >
        발표 목록
      </button>
      <button
        className={classNames([clicked === 'report' && styles.clicked])}
        name="report"
        onClick={onClick}
      >
        리포트
      </button>
      {/* <button onClick={tmpReIssueTest}>토큰 재발급</button>
      <button onClick={tmpMyInfoTest}>내 정보</button> */}
    </>
  );
};

export default NavMenu;
