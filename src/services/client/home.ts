import { fetch_ClientAuth } from './fetchClient';

export const clientHomeApi = {
  getPresentationList: async ({ pageParam }: { pageParam?: number }) => {
    const response = await fetch_ClientAuth(`/api/presentations?page=${pageParam}&size=6`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 불러오는 도중 문제가 발생 했습니다');
    }

    return response;
  },

  getLatestPresentation: async () => {
    const response = await fetch_ClientAuth(`/api/presentations/latest`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 불러오는 도중 문제가 발생 했습니다');
    }

    return response;
  },

  deletePresentationList: async (presentationIds: { presentationIds: number[] }) => {
    const response = await fetch_ClientAuth(`/api/presentations`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(presentationIds),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || '데이터를 삭제하는 도중 문제가 발생 했습니다');
    }

    return response;
  },
};
