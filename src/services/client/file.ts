import { UploadFile } from '@/types/service';
import { fetch_ClientAuth } from './fetchClient';

export const FileService = {
  fileUpload: async (file: File | Blob, filename?: string) => {
    const formData = new FormData();
    formData.append('file', file, filename);
    console.log('form data : ', formData);

    const response = await fetch_ClientAuth(`/api/files/upload`, {
      method: 'POST',
      body: formData,
    });

    const data: UploadFile = await response.json();

    return data;
  },
};
