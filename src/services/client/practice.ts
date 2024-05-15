import { SavePracticeParams } from '@/types/service';
import { fetch_ClientAuth } from './fetchClient';

export const PracticeService = {
  /** 발표 상세 조회 */
  getPracticeDetail: async (presentationId: number) => {
    const response = await fetch_ClientAuth(`/api/practices/presentation/${presentationId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (response.ok) return await response.json();

    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },
  /** 다음 슬라이드 모달 비활성화 */
  patchDeactiveModal: async () => {
    const response = await fetch_ClientAuth('/api/practices/deactivate-modal', {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 저장하는 도중 문제가 발생 했습니다');
    }

    return response;
  },
  /** 발표 연습 완료된 페이지(슬라이드) 저장 */
  patchSlide: async (slideId: number, data: SavePracticeParams) => {
    const response = await fetch_ClientAuth(`/api/slides/${slideId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 저장하는 도중 문제가 발생 했습니다');
    }

    return response;
  },
};
