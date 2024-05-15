import { UploadDataType } from '@/types/service';
import { fetch_ServerAuth } from './fetchServer';
import { SERVER_BASE_URL } from './serverApiBaseURL';

export const serverPptApi = {
  getPresentationData: async (presentationId: number) => {
    const response = await fetch_ServerAuth(
      `${SERVER_BASE_URL}/api/presentations/${presentationId}`,
      {
        method: 'GET',
      },
    );
    // const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(3000);

    return response;
  },
};
