'use client';

import Image from 'next/image';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';
import styles from './UploadPpt.module.scss';
import { UploadDataType, ValidtaionType } from '@/types/service';
import PptImageSvgs from '@/app/(afterlogin)/upload/[id]/_svgs/PptImgSvgs';
import { FieldErrors, UseFormGetValues } from 'react-hook-form';
import { MAX_LENGTH } from '@/config/const';
import { FileService } from '@/services/client/file';

interface UploadPptProps {
  pptInfo: UploadDataType['slides'][0];
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  initialState: UploadDataType;
  changeCurrentPageIndex: (nextIndex: number) => void;
  getValues: UseFormGetValues<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}
const UploadPpt = ({
  pptInfo,
  setPresentationData,
  currentPageIndex,
  changeCurrentPageIndex,
  initialState,
  errors,
  getValues,
}: UploadPptProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    if (imageRef.current?.files) {
      const file = imageRef.current.files[0];

      if (file) {
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //   setPresentationData((prev) => {
        //     const shallow = [...prev.slides];
        //     shallow[currentPageIndex] = {
        //       ...shallow[currentPageIndex],
        //       imageFileId: {
        //         dataURL: reader.result as string, // 미리보기용
        //         file, // 서버용
        //       },
        //     };

        //     // 추가
        //     if (currentPageIndex === prev.slides.length - 1) {
        //       shallow.push(initialState.slides[0]);
        //     }

        //     return {
        //       ...prev,
        //       slides: shallow,
        //     };
        //   });
        // };

        // reader.readAsDataURL(file);
        // const imageResponse = await FileService.fileUpload(file);
        // const { id, path } = await imageResponse.json();
        const { id, path } = await FileService.fileUpload(file);
        setPresentationData((prev) => {
          const shallow = [...prev.slides];
          shallow[currentPageIndex] = {
            ...shallow[currentPageIndex],
            imageFileId: id,
            imageFilePath: path,
          };

          // 추가
          if (currentPageIndex === prev.slides.length - 1) {
            shallow.push(initialState.slides[0]);
          }

          return {
            ...prev,
            slides: shallow,
          };
        });
      }
    }
  };

  const movePage = (index: number) => {
    changeCurrentPageIndex(index);

    if (
      errors.script ||
      errors.memo ||
      getValues('script').length > MAX_LENGTH.SCRIPT ||
      getValues('script').length === 0 ||
      getValues('memo').length > MAX_LENGTH.MEMO
    )
      return;
    setPresentationData((prev) => {
      const shallow = { ...prev };
      shallow.title = getValues('title');
      const shallowSlides = [...shallow.slides];
      shallowSlides[currentPageIndex] = {
        ...shallowSlides[currentPageIndex],
        script: getValues('script'),
        memo: getValues('memo'),
      };
      return {
        ...shallow,
        slides: shallowSlides,
      };
    });
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
        {pptInfo.imageFilePath === null ? (
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
                src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${pptInfo.imageFilePath}`}
                alt={`${currentPageIndex + 1}페이지 ppt 이미지`}
                width={503}
                height={283}
                // fill
                style={{ objectFit: 'contain', borderRadius: '16px' }}
                className={styles.pptImage}
              />
              <button className={styles.changePptImageButton} onClick={onClickButton}>
                이미지 추가 및 변경하기
              </button>
            </div>
            {currentPageIndex !== 0 && (
              <button
                className={styles.goLeft}
                disabled={currentPageIndex === 0}
                onClick={() => movePage(currentPageIndex - 1)}
              >
                <PptImageSvgs>
                  <PptImageSvgs.GoLeft />
                </PptImageSvgs>
              </button>
            )}

            <button className={styles.goRight} onClick={() => movePage(currentPageIndex + 1)}>
              <PptImageSvgs>
                <PptImageSvgs.GoRight />
              </PptImageSvgs>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPpt;
