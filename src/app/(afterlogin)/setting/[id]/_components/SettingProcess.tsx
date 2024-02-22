'use client';

import { useState } from 'react';
import styles from './SettingProcess.module.scss';
import StepsBar from './StepsBar';
import StepsDescription from './StepsDescription';
import StepsContent from './StepsContent';

type ProcessStepType = 0 | 1 | 2;

export interface ContentType {
  mode: 'all' | 'memorise' | null;
  sentence: unknown | null;
  device: 'desktop' | 'both' | null;
}

const SettingProcess = () => {
  const [currentStep, setCurrentStep] = useState<ProcessStepType>(0);
  const [selectedValue, setSelectedValue] = useState<ContentType>({
    mode: null,
    sentence: null,
    device: null,
  });

  const onNextStep = () => {
    if (currentStep === 2) return;
    if (currentStep === 0 && selectedValue.mode === 'all') setCurrentStep(2);
    else setCurrentStep((prev) => (prev + 1) as ProcessStepType);
  };
  return (
    <div className={styles.container}>
      <StepsBar current={currentStep} />
      <StepsDescription current={currentStep} />
      <StepsContent
        current={currentStep}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <button className={styles.confirmButton} onClick={onNextStep}>
        확인
      </button>
    </div>
  );
};

export default SettingProcess;
