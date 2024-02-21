/** 클라이언트 컴포넌트에서 사용하는 인증 기반 fetch
 *
 * @param url: 프록시 기반 백엔드 api
 * @param options: fetch 옵션 객체
 */

import { ERROR_MESSAGE } from '@/config/const';

export const fetch_ClientAuth = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    credentials: 'include',
    ...options,
  });

  // 첫번째 fetch이후, fetch_ClientAuth 만의 토큰 재발급 관련 에러는 여기서 처리
  // 토큰 만료 시
  if (response.status === 401) {
    try {
      // accessToken 재발급
      const clientUrl = `/api/accounts/reissue`;
      const accessTokenResponse = await fetch(clientUrl, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });

      if (accessTokenResponse.ok) {
        response = await fetch(url, {
          ...options,
          cache: 'no-store',
          credentials: 'include',
        });
        // if (!response.ok) throw new Error(ERROR_MESSAGE.SERVICE.RETRY); // 재요청에 대한 에러도 그대로 반환
      } else {
        // refreshToken의 부재로 재발급이 불가능
        throw new Error(ERROR_MESSAGE.AUTH.EXPIRE);
      }
    } catch (e) {
      if (e instanceof Error) {
        // 토큰 재발급 과정에서 에러가 발생하면 로그인 페이지로 이동
        alert(e.message);
        window.location.href = '/login';
      }
    }
  }

  // 성공 or 에러를 그대로 반환
  return response;
};
