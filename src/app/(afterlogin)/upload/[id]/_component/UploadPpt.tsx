'use client';

import Image from 'next/image';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';
import styles from './UploadPpt.module.scss';
import { PagesDataType } from '@/types/service';
import PptImageSvgs from '@/app/_components/_svgs/PptImgSvgs';

interface UploadPptProps {
  pptInfo: PagesDataType['scripts'][0]['ppt'];
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  initialState: PagesDataType;
  changeCurrentPageIndex: (nextIndex: number) => void;
}
const UploadPpt = ({
  pptInfo,
  setPresentationData,
  currentPageIndex,
  changeCurrentPageIndex,
  initialState,
}: UploadPptProps) => {
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

          // 추가
          if (currentPageIndex === prev.scripts.length - 1) {
            shallow.push(initialState.scripts[0]);
          }

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
      <input
        id="ppt"
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
              <PptImageSvgs>
                <PptImageSvgs.NewPpt />
              </PptImageSvgs>
              <button className={styles.updateButton} onClick={onClickButton}>
                PPT 이미지 등록하기
              </button>
            </div>
          ) : (
            <div className={styles.pptImageSection}>
              <div className={styles.hoverSection}>
                <Image
                  src={pptInfo.dataURL as string}
                  alt="ppt image"
                  fill
                  style={{ objectFit: 'contain' }}
                  className={styles.pptImage}
                />
                <button className={styles.changePptImageButton} onClick={onClickButton}>
                  이미지 변경
                </button>
              </div>
              {currentPageIndex !== 0 && (
                <button
                  className={styles.goLeft}
                  disabled={currentPageIndex === 0}
                  onClick={() => changeCurrentPageIndex(currentPageIndex - 1)}
                >
                  <PptImageSvgs>
                    <PptImageSvgs.GoLeft />
                  </PptImageSvgs>
                </button>
              )}

              <button
                className={styles.goRight}
                onClick={() => changeCurrentPageIndex(currentPageIndex + 1)}
              >
                <PptImageSvgs>
                  <PptImageSvgs.GoRight />
                </PptImageSvgs>
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UploadPpt;
