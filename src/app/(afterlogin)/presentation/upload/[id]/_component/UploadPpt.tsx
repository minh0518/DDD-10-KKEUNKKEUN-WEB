'use client';

import Button from '@/app/_components/_elements/Button';
import Image from 'next/image';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';
import styles from './UploadPpt.module.scss';
import { PagesDataType } from '@/types/service';

interface UploadPptProps {
  pptInfo: PagesDataType['scripts'][0]['ppt'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
}
const UploadPpt = ({ pptInfo, setPresentationData, currentPageIndex }: UploadPptProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (imageRef.current?.files) {
      const file = imageRef.current.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setPresentationData((prev) => {
          const shallow = [...prev.scripts];
          shallow[currentPageIndex] = {
            ...shallow[currentPageIndex],
            ppt: {
              dataURL: reader.result as string, // 미리보기용
              file, // 서버용
            },
          };

          return {
            ...prev,
            scripts: shallow,
          };
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>발표 자료 추가</p>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUpload}
        name="imageFiles"
        hidden
        ref={imageRef}
      />
      <div className={styles.pptUpdateSection}>
        {
          //  pptInfo.file === null ||
          pptInfo.dataURL === null ? (
            <div className={styles.newPptSection}>
              <div>LOGO</div>
              <Button
                onClick={onClickButton}
                _content={<p>PPT 이미지 등록하기</p>}
                className={styles.updateButton}
              />
            </div>
          ) : (
            <div className={styles.pptImageSection}>
              <Image
                src={pptInfo.dataURL as string}
                alt="ppt image"
                fill
                style={{ objectFit: 'contain' }}
                className={styles.pptImage}
              />
              <Button
                _content={'이미지 변경'}
                className={styles.changePptImageButton}
                onClick={onClickButton}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UploadPpt;
