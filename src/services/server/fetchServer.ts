/** 서버 컴포넌트에서 사용하는 인증 기반 fetch
 *
 * @param url: 실제 백엔드 api(프록시 X)
 * @param options: fetch 옵션 객체
 */

import { cookies } from 'next/headers';

export const fetch_ServerAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: { Cookie: cookies().toString() },
    ...options,
  });
  if (response.status === 401) {
    throw new Error('reIssue');
  }

  return response;
};
