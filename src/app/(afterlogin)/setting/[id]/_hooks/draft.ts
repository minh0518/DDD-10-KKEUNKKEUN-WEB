import { SlidesSettingType } from '@/types/service';
import { useState } from 'react';

// export const useSettingInfo = (settingValue: SlidesSettingType | undefined) => {
//   const [draft, setDraft] = useState<Partial<SlidesSettingType>>({});

//   const value = { ...settingValue, ...draft };

//   const onChange = <K extends keyof SlidesSettingType>(key: K, value: SlidesSettingType[K]) => {
//     setDraft({ ...draft, [key]: value });
//   };

//   return { value, onChange };
// };

export const useSettingInfo = (settingValue: SlidesSettingType) => {
  const [draft, setDraft] = useState<Partial<SlidesSettingType>>({});

  const settingInfo = {
    ...settingValue,
    ...draft,
    slides:
      draft.slides ??
      settingValue.slides.map((slide) => ({
        ...slide,
        memorizationSentences:
          draft.slides?.find((d) => d.id === slide.id)?.memorizationSentences ??
          slide.memorizationSentences,
      })),
  };
  const onChangePracticeMode = (practiceMode: 'SHOW' | 'HIDE') => {
    setDraft({ ...draft, practiceMode });
  };

  const onChangeSlide = (
    index: number,
    memorizationSentences: { offset: number; length: number }[],
  ) => {
    const updatedSlides = [...(draft.slides ?? settingValue!.slides)];
    updatedSlides[index] = {
      ...updatedSlides[index],
      memorizationSentences,
    };

    setDraft({
      ...draft,
      slides: updatedSlides,
    });
  };
  const onReset = () => setDraft({});

  return { settingInfo, onChangePracticeMode, onChangeSlide, onReset };
};
