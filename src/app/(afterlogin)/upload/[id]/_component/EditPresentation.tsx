'use client';

import { useEffect, useState } from 'react';

import { UploadDataType } from '@/types/service';

import { useGetPresentationData } from '../_hooks/presentation';

import InputSection from './InputSection';

interface EditPresentationProps {
  slug: number;
}
const EditPresentation = ({ slug }: EditPresentationProps) => {
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
    // slides의 ID값은 무시
    slides: [{ imageFileId: null, imageFilePath: null, script: null, memo: null }],
  };

  const [presentationData, setPresentationData] = useState<UploadDataType>(initialState);
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  const value: UploadDataType = useGetPresentationData(slug);

  useEffect(() => {
    const initailSetting = async () => {
      setPresentationData(() => {
        const shallow = [...value.slides];
        shallow.push(...initialState.slides);
        return {
          ...value,
          slides: shallow,
        };
      });
    };

    if (value) initailSetting();
  }, [value]);

  return (
    <InputSection
      presentationData={presentationData}
      setPresentationData={setPresentationData}
      currentPageIndex={currentPageIndex}
      setCurrpentPageIndex={setCurrpentPageIndex}
      slug={slug}
      initialState={initialState}
    />
  );
};

export default EditPresentation;
