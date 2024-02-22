'use client';

import { Dispatch, SetStateAction } from 'react';
import DragSection from './DragSection';
import SelectCardSection from './SelectCardSection';
import styles from './StepsContent.module.scss';
import { ContentType } from './SettingProcess';
import SelectSentenceSection from './SelectSentenceSection';

interface StepsContentProps {
  current: number;
  selectedValue: ContentType;
  setSelectedValue: Dispatch<SetStateAction<ContentType>>;
}
const StepsContent = ({ current, setSelectedValue, selectedValue }: StepsContentProps) => {
  return (
    <div className={styles.container}>
      {current === 1 ? (
        <SelectSentenceSection />
      ) : (
        <SelectCardSection
          current={current}
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
      )}
    </div>
  );
};

export default StepsContent;
