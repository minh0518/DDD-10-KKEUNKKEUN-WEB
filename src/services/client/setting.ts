import { SlidesSettingType } from '@/types/service';
import { fetch_ClientAuth } from './fetchClient';

export const clientSettingApi = {
  /**
   * 클라이언트 컴포넌트에서, 발표 연습 세팅 데이터를 가져오는 함수
   * @return 발표 연습 세팅 데이터를 반환 합니다
   */
  getPresentationSettingData: async (presentationId: number) => {
    const response = await fetch_ClientAuth(`/api/practices/presentation/${presentationId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (response.ok) return response;

    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },

  /**
   * 클라이언트 컴포넌트에서, 발표 연습 세팅이 완료된 객체를 저장하는 함수
   * @return void
   */
  patchSettingInfo: async (settingInfo: SlidesSettingType, presentationId: number) => {
    const response = await fetch_ClientAuth(`/api/practices/presentation/${presentationId}`, {
      method: 'PATCH',
      cache: 'no-store',
      body: JSON.stringify(settingInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // mutation의 onError로 전달
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 저장하는 도중 문제가 발생 했습니다');
    }

    return response;
  },
};
