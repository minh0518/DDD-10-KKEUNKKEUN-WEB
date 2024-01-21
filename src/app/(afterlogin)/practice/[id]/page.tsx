'use client';

import QRCode from 'react-qr-code';
import Recorder from '../_components/Recorder';
import ImageUploader from '@/app/_components/_modules/ImageUploader';
import ImagePreview from '@/app/_components/_modules/ImagePreview';
import useImageUploader from '@/app/_hooks/useImageUploader';

export default function Page({ params }: { params: { id: string } }) {
  const { selectedFiles, base64Strings, handleFileChange } = useImageUploader();
  return (
    <>
      <div>id: {params.id}</div>
      <div style={{ width: '100px', height: '100px' }}>
        <QRCode
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={'www.naver.com'}
        />
      </div>
      <div>
        <Recorder />
      </div>
      <div>
        <ImageUploader _handleFileChange={handleFileChange} />
        <ImagePreview selectedFiles={selectedFiles} base64Strings={base64Strings} />
      </div>
    </>
  );
}
