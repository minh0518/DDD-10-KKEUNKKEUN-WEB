'use client';
import { PagesDataType, ValidtaionType } from '@/types/service';
import styles from './InputSection.module.scss';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import UploadTitle from './UploadTitle';
import UploadScript from './UploadScript';
import UploadMemo from './UploadMemo';
import UploadDday from './UploadDday';
import UploadTimer from './UploadTimer';
import Button from '@/app/_components/_elements/Button';
import UploadPpt from './UploadPpt';
import ControlButtons from './ControlButtons';
import { useToastStore } from '@/store/modal';
import SaveToast from '@/app/_components/_modules/SaveToast';
import { useForm } from 'react-hook-form';

interface InputSectionProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: PagesDataType;
  slug?: string | 'new';
}
const InputSection = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  setCurrpentPageIndex,
  initialState,
  slug,
}: InputSectionProps) => {
  const { openModal } = useToastStore();

  const openModalWithData = (data: ReactNode) =>
    openModal({
      content: data,
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
        dDayDate: presentationData.dDay.date,
      });
    };
    resetFormData();
  }, [presentationData, currentPageIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSectionWrapper}>
        <div className={styles.leftSection}>
          <p className={styles.description}>
            발표 자료 추가 <span>* 필수항목</span>
          </p>
          <UploadPpt
            pptInfo={presentationData.scripts[currentPageIndex].ppt}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
          />
          <ControlButtons
            presentationData={presentationData}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
            setCurrpentPageIndex={setCurrpentPageIndex}
            initialState={initialState}
          />
        </div>
      </div>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSection}>
          <form
            onSubmit={handleSubmit((data) => {
              // mutation의 onSuccess로 모달 띄우기
              console.log(JSON.stringify(data));
              openModalWithData(<SaveToast />);
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
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
              register={register}
              errors={errors}
            />
            <UploadMemo
              memo={presentationData.scripts[currentPageIndex].memo || ''}
              setPresentationData={setPresentationData}
              currentPageIndex={currentPageIndex}
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
              <Button
                _content={<p>저장</p>}
                type="submit"
                className={styles.save}
                disabled={isSubmitting}
              />
              <Button
                _content={<p>발표 연습 시작하기</p>}
                onClick={() => {}}
                className={styles.start}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
