import { fetch_ServerAuth } from './fetchServer';
import { SERVER_BASE_URL } from './serverApiBaseURL';

export const serverFeedbackApi = {
  getFeedbackInfo: async (feedbackId: number) => {
    const response = await fetch_ServerAuth(`${SERVER_BASE_URL}/api/feedbacks/${feedbackId}`, {
      method: 'GET',
    });
    // console.log('response');
    // console.log(response);
    if (response.ok) return response;

    const errorBody = await response.json();
    throw new Error(errorBody.message || '데이터를 불러오는 도중 문제가 발생했습니다');
  },
  getFeedbackList: async ({ pageParam }: { pageParam?: number }) => {
    const response = await fetch_ServerAuth(
      `${SERVER_BASE_URL}/api/feedbacks?page=${pageParam}&size=6`,
      {
        method: 'GET',
      },
    );
    if (response.ok) return response;

    const errorBody = await response.json();
    throw new Error(errorBody.message || '데이터를 불러오는 도중 문제가 발생했습니다');
  },
};
