import { UploadDataType } from '@/types/service';
import { fetch_ClientAuth } from './fetchClient';
import { ERROR_MESSAGE } from '@/config/const';

export const clientPptApi = {
  postImageUrl: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch_ClientAuth(`/api/files/upload`, {
      method: 'POST',

      body: formData,
    });

    return response;
  },

  postPresentationUpload: async (data: UploadDataType) => {
    const response = await fetch_ClientAuth(`/api/presentations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  },

  getPresentationData: async (presentationId: number) => {
    const response = await fetch_ClientAuth(`/api/presentations/${presentationId}`, {
      method: 'GET',
    });

    return response;
  },

  patchPresentationData: async (presentationId: number, data: UploadDataType) => {
    const response = await fetch_ClientAuth(`/api/presentations/${presentationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // mutation의 onError
    if (response.status === 401) throw new Error(ERROR_MESSAGE.AUTH.EXPIRE);
    return response;
  },

  // mock
  // TODO: 백엔드 api로 변경 및 삭제 예정
  getMockPresentData: async <T>(id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_HANDLER}/api/get/list/${id}`, {
      cache: 'no-store',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('something went to wrong');
    }

    const result = await response.json();

    return result as T;
  },
};
