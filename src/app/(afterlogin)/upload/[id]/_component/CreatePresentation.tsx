'use client';

import { useState } from 'react';

import { UploadDataType } from '@/types/service';

import InputSection from './InputSection';

const CreatePresentation = () => {
  const initialState: UploadDataType = {
    title: null,
    deadlineDate: null,
    timeLimit: {
      hours: null,
      minutes: 1,
    },
    alertTime: {
      hours: null,
      minutes: null,
    },
    slides: [{ imageFileId: null, imageFilePath: null, script: null, memo: null }],
  };

  const [presentationData, setPresentationData] = useState<UploadDataType>(initialState);
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  return (
    <InputSection
      presentationData={presentationData}
      setPresentationData={setPresentationData}
      currentPageIndex={currentPageIndex}
      setCurrpentPageIndex={setCurrpentPageIndex}
      initialState={initialState}
      slug="new"
    />
  );
};

export default CreatePresentation;
