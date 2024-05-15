'use client';

import { Dispatch, SetStateAction, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { usePatchPresentationData, usePostPresentationData } from '../_hooks/presentation';
import useToggle from '@/app/_hooks/useToggle';

import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadMemo from './UploadMemo';
import UploadDeadlineDate from './UploadDeadlineDate';
import UploadTimer from './UploadTimer';
import UploadPpt from './UploadPpt';
import ControlButtons from './ControlButtons';
import Required from './Required';

import Confirm from '@/app/_components/_modules/_modal/Confirm';

import styles from './InputSection.module.scss';

import { UploadDataType, ValidtaionType } from '@/types/service';
import { MAX_LENGTH } from '@/config/const';

import { useRouter } from 'next/navigation';
import PptImageSvgs from '../_svgs/PptImgSvgs';

interface InputSectionProps {
  presentationData: UploadDataType;
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: UploadDataType;
  slug?: number | 'new';
}

interface ErroForMovePageType {
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
  const router = useRouter();
  const [errorForMovePage, setErrorForMovePage] = useState<ErroForMovePageType>({
    script: {
      minLength: false,
      maxLength: false,
    },
    memo: false,
  });
  const [submitAction, setSubmitAction] = useState<'save' | 'start'>('save');
  const handleSaveClick = () => setSubmitAction('save');
  const handleStartClick = () => setSubmitAction('start');

  const postMutation = usePostPresentationData(submitAction);
  const patchMutation = usePatchPresentationData(submitAction, slug!);
  const confirm = useToggle();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<ValidtaionType>();

  useEffect(() => {
    const resetFormData = () => {
      reset({
        title: presentationData.title || '',
        script: presentationData.slides[currentPageIndex].script || '',
        memo: presentationData.slides[currentPageIndex].memo || '',
        deadlineDate: presentationData.deadlineDate,
      });
    };
    resetFormData();
  }, [presentationData, currentPageIndex]);

  const changeCurrentPageIndex = useCallback(
    (nextIndex: number) => {
      if (currentPageIndex === presentationData.slides.length - 1) {
        setCurrpentPageIndex(nextIndex);
      } else {
        // 폼 데이터 사용 (watch도 가능)
        setErrorForMovePage({
          memo: getValues('memo').length > MAX_LENGTH.MEMO,
          script: {
            minLength: getValues('script').length === 0,
            maxLength: getValues('script').length > MAX_LENGTH.SCRIPT,
          },
        });

        if (
          errors.script ||
          errors.memo ||
          getValues('script').length > MAX_LENGTH.SCRIPT ||
          getValues('script').length === 0 ||
          getValues('memo').length > MAX_LENGTH.MEMO
        )
          return;

        setCurrpentPageIndex(nextIndex);
      }
    },
    [
      currentPageIndex,
      errors.memo,
      errors.script,
      getValues,
      presentationData.slides.length,
      setCurrpentPageIndex,
    ],
  );

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
            pptInfo={presentationData.slides[currentPageIndex]}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
            initialState={initialState}
            getValues={getValues}
            errors={errors}
          />
          <ControlButtons
            presentationData={presentationData}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            changeCurrentPageIndex={changeCurrentPageIndex}
            getValues={getValues}
            errors={errors}
          />
        </div>
      </div>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSection}>
          <button
            className={styles.cancelButton}
            onClick={() => {
              confirm.onOpen();
            }}
          >
            <PptImageSvgs>
              <PptImageSvgs.X />
            </PptImageSvgs>
          </button>
          <Confirm
            context={confirm}
            title="발표 자료 추가를 중단하시겠어요?"
            message="임시저장하지 않은 자료는 복원할 수 없어요."
            okayText="중단하기"
            cancelText="계속 작성하기"
            onOkayClick={() => {
              router.push('/home');
              confirm.onClose();
            }}
          />
          <form
            onSubmit={handleSubmit(async (data) => {
              // 1. 마지막 더미 페이지 제거
              const shallow = { ...presentationData };
              const shallowSlides = [...presentationData.slides.slice(0, -1)];

              // 2. 현재페이지의 title,script,memo를 getValue로 가져온 뒤 상태에 추가
              shallow.title = data.title;
              shallowSlides[currentPageIndex] = {
                ...shallowSlides[currentPageIndex],
                script: data.script,
                memo: data.memo,
              };
              const result = {
                ...shallow,
                slides: shallowSlides,
              };

              // 3. post, patch + mutation의 onSuccess로 모달 띄우기
              if (slug === 'new') {
                // post
                postMutation.mutate(result);
              }
              if (slug !== 'new') {
                // patch
                patchMutation.mutate(result);
              }
            })}
          >
            <UploadTitle
              title={presentationData.title || ''}
              setValue={setValue}
              register={register}
              errors={errors}
            />
            <UploadScript
              script={presentationData.slides[currentPageIndex].script || ''}
              lastDummyPageIndex={presentationData.slides.length - 1}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              setValue={setValue}
              errorForMovePage={errorForMovePage}
            />

            <UploadMemo
              memo={presentationData.slides[currentPageIndex].memo || ''}
              lastDummyPageIndex={presentationData.slides.length - 1}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <div className={styles.line} />

            <UploadDeadlineDate
              deadlineDate={presentationData.deadlineDate}
              setPresentationData={setPresentationData}
              register={register}
              errors={errors}
              currentPageIndex={currentPageIndex}
              getValues={getValues}
            />
            <UploadTimer
              timeLimit={presentationData.timeLimit}
              alertTime={presentationData.alertTime}
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
              getValues={getValues}
            />
            <div className={styles.saveButtons}>
              <button
                type="submit"
                onClick={handleSaveClick}
                className={styles.save}
                disabled={isSubmitting || presentationData.slides.length === 1}
              >
                <p>임시저장</p>
              </button>
              <button
                type="submit"
                onClick={handleStartClick}
                className={styles.start}
                disabled={isSubmitting || presentationData.slides.length === 1}
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
