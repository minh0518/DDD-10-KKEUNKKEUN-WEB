'use client';
import { PagesDataType, ValidtaionType } from '@/types/service';
import styles from './InputSection.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadMemo from './UploadMemo';
import UploadDday from './UploadDday';
import UploadTimer from './UploadTimer';
import UploadPpt from './UploadPpt';
import ControlButtons from './ControlButtons';
import { useModalStore, useToastStore } from '@/store/modal';
import SaveToast from '@/app/_components/_modules/SaveToast';
import { useForm } from 'react-hook-form';
import Required from './Required';
import { checkValidtaion } from '../_utils/validation';

import PptImageSvgs from '@/app/_components/_svgs/PptImgSvgs';
import ModalContents from '@/app/_components/_modules/_modal/ModalContents';

interface InputSectionProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: PagesDataType;
  slug?: string | 'new';
}

interface ErroOnEachPageType {
  memo: boolean;
  script: {
    minLength: boolean;
    maxLength: boolean;
  };
}
const InputSection = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  setCurrpentPageIndex,
  initialState,
  slug,
}: InputSectionProps) => {
  const [erroOnEachPage, setErroOnEachPage] = useState<ErroOnEachPageType>({
    script: {
      minLength: false,
      maxLength: false,
    },
    memo: false,
  });

  const { openToast } = useToastStore();

  const openToastWithData = () =>
    openToast({
      content: <SaveToast />,
    });

  const { openModal } = useModalStore();

  const openModalWithData = () =>
    openModal({
      content: (
        <ModalContents>
          <ModalContents.ExitUpload />
        </ModalContents>
      ),
      onCancelButton: (
        <ModalContents>
          <ModalContents.ExitUploadCancel />
        </ModalContents>
      ),
      onSubmitButton: (
        <ModalContents>
          <ModalContents.ExitUploadSubmit />
        </ModalContents>
      ),
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { defaultValues, isSubmitting, isSubmitted, errors },
  } = useForm<ValidtaionType>();

  useEffect(() => {
    const resetFormData = () => {
      reset({
        title: presentationData.title || '',
        script: presentationData.scripts[currentPageIndex].script || '',
        memo: presentationData.scripts[currentPageIndex].memo || '',
        dDayDate: presentationData.dDay.date,
      });
    };
    resetFormData();
  }, [presentationData, currentPageIndex]);

  const changeCurrentPageIndex = async (nextIndex: number) => {
    if (currentPageIndex === presentationData.scripts.length - 1) {
      setCurrpentPageIndex(nextIndex);
    } else {
      const validateResult = checkValidtaion(presentationData, currentPageIndex);

      setErroOnEachPage({
        memo: validateResult.memo,
        script: {
          minLength: validateResult.script.minLength,
          maxLength: validateResult.script.maxLength,
        },
      });

      if (
        !validateResult.memo &&
        !validateResult.script.maxLength &&
        !validateResult.script.minLength
      )
        setCurrpentPageIndex(nextIndex);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSectionWrapper}>
        <div className={styles.leftSection}>
          <p className={styles.description}>
            발표 자료 추가
            <span style={{ color: '#DE3428', margin: 20, fontWeight: '500' }}>
              <Required />
              필수항목
            </span>
          </p>
          <UploadPpt
            pptInfo={presentationData.scripts[currentPageIndex].ppt}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
            initialState={initialState}
          />
          <ControlButtons
            presentationData={presentationData}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
          />
        </div>
      </div>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSection}>
          <button className={styles.cancelButton} onClick={openModalWithData}>
            <PptImageSvgs>
              <PptImageSvgs.X />
            </PptImageSvgs>
          </button>
          <form
            onSubmit={handleSubmit((data) => {
              // 마지막 페이지는 제거
              // mutation의 onSuccess로 모달 띄우기
              console.log(JSON.stringify(data));
              openToastWithData();
            })}
          >
            <UploadTitle
              title={presentationData.title || ''}
              setPresentationData={setPresentationData}
              register={register}
              errors={errors}
            />
            <UploadScript
              script={presentationData.scripts[currentPageIndex].script || ''}
              lastDummyPageIndex={presentationData.scripts.length - 1}
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              erroOnEachPage={erroOnEachPage}
            />
            <UploadMemo
              memo={presentationData.scripts[currentPageIndex].memo || ''}
              lastDummyPageIndex={presentationData.scripts.length - 1}
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              erroOnEachPage={erroOnEachPage}
            />
            <div className={styles.line} />

            <UploadDday
              dDay={presentationData.dDay}
              setPresentationData={setPresentationData}
              register={register}
              errors={errors}
            />
            <UploadTimer time={presentationData.time} setPresentationData={setPresentationData} />
            <div className={styles.saveButtons}>
              <button
                type="submit"
                onClick={() => {}}
                className={styles.save}
                disabled={isSubmitting || presentationData.scripts.length === 1}
              >
                <p>임시저장</p>
              </button>
              <button
                type="submit"
                onClick={() => {}}
                className={styles.start}
                disabled={isSubmitting || presentationData.scripts.length === 1}
              >
                <p>저장하고 발표 연습 시작하기</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
