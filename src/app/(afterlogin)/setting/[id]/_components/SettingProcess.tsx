'use client';

import { useState } from 'react';
import styles from './SettingProcess.module.scss';
import StepsBar from './StepsBar';
import StepsDescription from './StepsDescription';
import StepsContent from './StepsContent';
import { SlidesSettingType } from '@/types/service';
import {
  initialValue,
  useGetPrefetchSettingData,
  usePatchSettingInfo,
} from '../_hooks/settingInfo';
import { usePathname } from 'next/navigation';
import { useSettingInfo } from '../_hooks/draft';

type ProcessStepType = 0 | 1 | 2;

const SettingProcess = () => {
  const pathName = usePathname();
  const slug = Number(pathName.split('/').pop());

  const [selectedDevice, setSelectedDevice] = useState<'DESKTOP' | 'BOTH'>('DESKTOP');
  const { data: totalInfo } = useGetPrefetchSettingData(slug);
  const defaultSettingValues: SlidesSettingType = totalInfo
    ? {
        practiceMode: totalInfo.practiceMode,
        slides: totalInfo.slides.map((slide) => {
          return {
            id: slide.id,
            memorizationSentences: slide.memorizationSentences.map((sentence) => {
              return { offset: sentence.offset, length: sentence.length };
            }),
          };
        }),
      }
    : initialValue;

  const { settingInfo, onChangePracticeMode, onChangeSlide, onReset } =
    useSettingInfo(defaultSettingValues);

  const patchMutation = usePatchSettingInfo(settingInfo, totalInfo!.presentationId, selectedDevice);

  const [currentStep, setCurrentStep] = useState<ProcessStepType>(0);

  const onNextStep = () => {
    if (currentStep === 2) {
      patchMutation.mutate();
    }
    if (currentStep === 0 && settingInfo.practiceMode === 'SHOW') {
      setCurrentStep(2);
    } else if (currentStep !== 2) setCurrentStep((prev) => (prev + 1) as ProcessStepType);
  };

  return (
    <div className={styles.container}>
      {totalInfo && settingInfo && (
        <>
          <StepsBar currentStep={currentStep} />
          <StepsDescription currentStep={currentStep} />
          <StepsContent
            totalInfo={totalInfo}
            settingInfo={settingInfo}
            currentStep={currentStep}
            onChangePracticeMode={onChangePracticeMode}
            onChangeSlide={onChangeSlide}
            setSelectedDevice={setSelectedDevice}
            selectedDevice={selectedDevice}
          />

          <button className={styles.confirmButton} onClick={onNextStep}>
            확인
          </button>
        </>
      )}
    </div>
  );
};

export default SettingProcess;
