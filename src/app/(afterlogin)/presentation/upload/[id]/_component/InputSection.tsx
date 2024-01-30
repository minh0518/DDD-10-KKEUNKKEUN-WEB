'use client';
import { PagesDataType } from '@/types/service';
import styles from './InputSection.module.scss';
import { Dispatch, ReactNode, SetStateAction } from 'react';
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

  return (
    <div className={styles.container}>
      <div className={styles.leftSectionWrapper}>
        <div className={styles.leftSection}>
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
          <UploadTitle
            title={presentationData.title || ''}
            setPresentationData={setPresentationData}
          />
          <UploadScript
            script={presentationData.scripts[currentPageIndex].script || ''}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
          />
          <UploadMemo
            memo={presentationData.scripts[currentPageIndex].memo || ''}
            setPresentationData={setPresentationData}
            currentPageIndex={currentPageIndex}
          />
          <div className={styles.line} />
          <UploadDday dDay={presentationData.dDay} setPresentationData={setPresentationData} />
          <UploadTimer time={presentationData.time} setPresentationData={setPresentationData} />

          <div className={styles.saveButtons}>
            <Button
              _content={<p>저장</p>}
              onClick={() => {
                openModalWithData(<SaveToast />);
              }}
              className={styles.save}
            />
            <Button
              _content={<p>발표 연습 시작하기</p>}
              onClick={() => {}}
              className={styles.start}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
