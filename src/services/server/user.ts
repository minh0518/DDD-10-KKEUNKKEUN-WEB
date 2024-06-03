import { cookies } from 'next/headers';
import { fetch_ServerAuth } from './fetchServer';
import { SERVER_BASE_URL } from '@/config/path';

export const serverUserApi = {
  /**
   * 서버 컴포넌트에서, 유저 정보를 가져오는 함수
   * @return 유저 정보 객체를 반환합니다
   */
  getUserInfo: async () => {
    const res = await fetch_ServerAuth(`${SERVER_BASE_URL}/api/accounts/me`, {
      method: 'GET',
      headers: { Cookie: cookies().toString() },
      cache: 'no-store',
    });
    return res;
  },
};
