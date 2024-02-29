import { fetch_ServerAuth } from './fetchServer';

export const serverSettingApi = {
  /**
   * 서버 컴포넌트에서, 발표 연습 세팅 데이터를 가져오는 함수
   * @return 발표 연습 세팅 데이터를 반환 합니다
   */
  getPresentationSettingData: async (presentationId: number) => {
    const response = await fetch_ServerAuth(
      `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/practices/presentation/${presentationId}`,
      { method: 'GET', cache: 'no-store' },
    );

    if (response.ok) return response;

    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },
};
