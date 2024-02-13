'use client';

import { useEffect, useState } from 'react';

import { PagesDataType } from '@/types/service';

import { useGetPresentationData } from '../_hooks/presentation';

import InputSection from './InputSection';

interface EditPresentationProps {
  slug: string;
}
const EditPresentation = ({ slug }: EditPresentationProps) => {
  const initialState: PagesDataType = {
    title: null,
    dDay: {
      date: null,
    },
    time: {
      timer: null,
      alramTime: null,
    },
    scripts: [{ ppt: { dataURL: null, file: null }, script: null, memo: null }],
  };

  const [presentationData, setPresentationData] = useState<PagesDataType>(initialState);
  const [currentPageIndex, setCurrpentPageIndex] = useState(0);

  const value = useGetPresentationData(slug);
  useEffect(() => {
    const initailSetting = async () => {
      const { data: originData, id: originId } = value;
      setPresentationData(() => {
        const shallow = [...originData.scripts];
        shallow.push(...initialState.scripts);
        return {
          ...originData,
          scripts: shallow,
        };
      });
    };

    initailSetting();
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
