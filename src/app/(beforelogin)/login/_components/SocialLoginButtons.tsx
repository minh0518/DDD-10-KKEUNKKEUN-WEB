'use client';

import classNames from 'classnames/bind';
import styles from './SocialLoginButtons.module.scss';

import SocialLogoIcon from '../_svgs/SocialLogoIcon';
import { SOCIAL_ACCESS_URL } from '@/config/path';

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
      <button className={cx(['buttons', 'google'])} onClick={() => onClick('google')}>
        <svg />
        Google로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'kakao'])} onClick={() => onClick('kakao')}>
        <SocialLogoIcon>
          <SocialLogoIcon.Kakao />
        </SocialLogoIcon>
        KAKAO로 시작하기
        <div />
      </button>
      <button className={cx(['buttons', 'naver'])} onClick={() => onClick('naver')}>
        <svg />
        네이버로 시작하기
        <div />
      </button>
    </>
  );
};

export default SocialLoginButtons;
