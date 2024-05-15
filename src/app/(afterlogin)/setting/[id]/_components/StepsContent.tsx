'use client';

import { Dispatch, SetStateAction } from 'react';

import SelectCardSection from './SelectCardSection';
import styles from './StepsContent.module.scss';
import SelectSentenceSection from './SelectSentenceSection';
import { SettingDataType, SlidesSettingType } from '@/types/service';

interface StepsContentProps {
  totalInfo: SettingDataType;
  settingInfo: SlidesSettingType;
  currentStep: number;
  onChangePracticeMode: (practiceMode: SlidesSettingType['practiceMode']) => void;
  onChangeSlide: (
    index: number,
    memorizationSentences: {
      offset: SlidesSettingType['slides'][0]['memorizationSentences'][0]['offset'];
      length: SlidesSettingType['slides'][0]['memorizationSentences'][0]['length'];
    }[],
  ) => void;
  setSelectedDevice: Dispatch<SetStateAction<'DESKTOP' | 'BOTH'>>;
  selectedDevice: 'DESKTOP' | 'BOTH';
}
const StepsContent = ({
  totalInfo,
  currentStep,
  onChangePracticeMode,
  onChangeSlide,
  settingInfo,
  setSelectedDevice,
  selectedDevice,
}: StepsContentProps) => {
  return (
    <div className={styles.container}>
      {currentStep === 1 ? (
        <SelectSentenceSection
          totalInfo={totalInfo}
          settingInfo={settingInfo}
          onChangeSlide={onChangeSlide}
        />
      ) : (
        <SelectCardSection
          settingInfo={settingInfo}
          currentStep={currentStep}
          onChangePracticeMode={onChangePracticeMode}
          setSelectedDevice={setSelectedDevice}
          selectedDevice={selectedDevice}
        />
      )}
    </div>
  );
};

export default StepsContent;
