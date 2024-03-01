'use client';

import classNames from 'classnames/bind';
import styles from './SocialLoginButtons.module.scss';

import { SOCIAL_ACCESS_URL } from '@/config/path';
import Image from 'next/image';
import GoogleIcon from '../_svgs/GoogleIcon';
import NaverIcon from '../_svgs/NaverIcon';
import KaKaoIcon from '../_svgs/KaKaoIcon';

const cx = classNames.bind(styles);

const SocialLoginButtons = () => {
  const onClick = (socialType: 'google' | 'kakao' | 'naver') => {
    let url;
    if (socialType === 'kakao') url = SOCIAL_ACCESS_URL.KAKAO;
    // if (socialType === 'naver') url = SOCIAL_ACCESS_URL.NAVER;
    // if (socialType === 'google') url = SOCIAL_ACCESS_URL.GOOGLE;

    window.location.href = `${url}`;
  };
  return (
    <>
      <button className={cx(['buttons', 'google'])} onClick={() => onClick('google')} disabled>
        <GoogleIcon />
        Google로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'kakao'])} onClick={() => onClick('kakao')}>
        <KaKaoIcon />
        KAKAO로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'naver'])} onClick={() => onClick('naver')} disabled>
        <NaverIcon />
        네이버로 시작하기
        <div />
      </button>
    </>
  );
};

export default SocialLoginButtons;
