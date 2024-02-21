'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/_components/_modules/Spinner';

import { useUserInfoStore } from '@/store/user';
import { fetch_ClientAuth } from '@/services/client/fetchClient';
import { ERROR_MESSAGE } from '@/config/const';

const GetToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeQuery = searchParams.get('code');
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const getLogin = async () => {
      const nextServerUrl = `${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/auth/kakao?code=${codeQuery}`;
      const clientUrl = `/api/accounts/login/process?code=${codeQuery}&provider=kakao`;
      try {
        const loginResponse = await fetch(`${clientUrl}`, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        });
        if (loginResponse.ok) {
          const clientUrl = `/api/accounts/me`;
          const userInfoResponse = await fetch_ClientAuth(clientUrl, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include',
          });

          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            setUserInfo({ ...userInfo });
            router.push('/login');
          } else {
            throw new Error(ERROR_MESSAGE.USER.ERROR);
          }
        } else if (loginResponse.status === 401) {
          const errorResponse = await loginResponse.json();
          const errorMessage = errorResponse.message || ERROR_MESSAGE.AUTH.EXIST;
          throw new Error(errorMessage);
        } else {
          throw new Error(ERROR_MESSAGE.AUTH.ERROR);
        }
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
          router.back(); // 위의 과정 중에서 하나라도 문제가 있다면 뒤로가기
        }
      }
    };
    if (codeQuery) {
      getLogin();
    }
  }, [router, codeQuery]);

  return (
    <>
      <Spinner />
    </>
  );
};

export default GetToken;
