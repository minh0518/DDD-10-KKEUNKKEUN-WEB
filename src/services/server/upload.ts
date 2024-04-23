import { UploadDataType } from '@/types/service';
import { fetch_ServerAuth } from './fetchServer';

export const serverPptApi = {
  getPresentationData: async (presentationId: number) => {
    const response = await fetch_ServerAuth(
      `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/presentations/${presentationId}`,
      {
        method: 'GET',
      },
    );
    // const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(3000);

    return response;
  },
};
