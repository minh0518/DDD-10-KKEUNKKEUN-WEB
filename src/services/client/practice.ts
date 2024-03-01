import { PracticeDetail } from '@/types/service';
import { fetch_ClientAuth } from './fetchClient';

export const PracticeService = {
  getPracticeDetail: async (presentationId: number) => {
    const response = await fetch_ClientAuth(`/api/practices/presentation/${presentationId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (response.ok) return await response.json();

    throw new Error('데이터를 불러오는 도중 문제가 발생했습니다');
  },
};
