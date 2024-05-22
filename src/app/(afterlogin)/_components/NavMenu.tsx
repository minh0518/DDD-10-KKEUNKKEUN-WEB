'use client';

import { MouseEventHandler, useMemo } from 'react';

import styles from './Navbar.module.scss';
import classNames from 'classnames';

import { fetch_ClientAuth } from '@/services/client/fetchClient';
import { ERROR_MESSAGE } from '@/config/const';
import { usePathname, useRouter } from 'next/navigation';
import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';

const NavMenu = () => {
  const pathName = usePathname();
  const pageName = useMemo(() => pathName.split('/')[1], [pathName]);
  const router = useRouter();

  const confirmHome = useToggle();
  const confirmFeedback = useToggle();

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

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget;

    if (pageName !== 'home' && pageName !== 'feedback' && name === 'home') {
      confirmHome.onOpen();
      return;
    }
    if (pageName !== 'home' && pageName !== 'feedback' && name === 'feedback') {
      confirmFeedback.onOpen();
      return;
    }

    if (name === 'home') {
      router.refresh();
      router.push('/home');
      return;
    }
    if (name === 'feedback') {
      router.refresh();
      router.push('/feedback/list');
      return;
    }
  };

  return (
    <>
      <button
        className={classNames([styles.menuButtons, pageName === 'home' && styles.clicked])}
        name="home"
        onClick={onClick}
      >
        발표 목록
      </button>
      <button
        className={classNames([styles.menuButtons, pageName === 'feedback' && styles.clicked])}
        name="feedback"
        onClick={onClick}
      >
        피드백
      </button>

      <Confirm
        context={confirmHome}
        title="발표 자료 추가를 중단하시겠어요?"
        message="임시저장하지 않은 자료는 복원할 수 없어요."
        okayText="중단하기"
        cancelText="계속 작성하기"
        onOkayClick={() => {
          router.push('/home');
          confirmHome.onClose();
        }}
      />
      <Confirm
        context={confirmFeedback}
        title="발표 자료 추가를 중단하시겠어요?"
        message="임시저장하지 않은 자료는 복원할 수 없어요."
        okayText="중단하기"
        cancelText="계속 작성하기"
        onOkayClick={() => {
          router.push('/feedback/list');
          confirmFeedback.onClose();
        }}
      />
      {/* <button onClick={tmpReIssueTest}>토큰 재발급</button>
      <button onClick={tmpMyInfoTest}>내 정보</button> */}
    </>
  );
};

export default NavMenu;
