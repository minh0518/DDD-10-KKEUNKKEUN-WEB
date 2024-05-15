'use client';
import { SettingDataType, SlidesSettingType } from '@/types/service';
import DragSection from './DragSection';
import styles from './SelectSentenceSection.module.scss';
import { useState } from 'react';
import Image from 'next/image';

interface SelectSentenceSectionProps {
  totalInfo: SettingDataType;
  settingInfo: SlidesSettingType;

  onChangeSlide: (
    index: number,
    memorizationSentences: {
      offset: SlidesSettingType['slides'][0]['memorizationSentences'][0]['offset'];
      length: SlidesSettingType['slides'][0]['memorizationSentences'][0]['length'];
    }[],
  ) => void;
}

const SelectSentenceSection = ({
  totalInfo,
  onChangeSlide,
  settingInfo,
}: SelectSentenceSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  // draft 데이터 적용을 위한 하드코딩 데이터
  const draftData = {
    blocks: [
      {
        key: 'randomKey',
        text: totalInfo.slides[currentPage].script,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          ...settingInfo.slides[currentPage].memorizationSentences.map((i) => {
            return {
              ...i, // offest, length
              style: 'PINK', // 인라인 스타일 정보 추가
            };
          }),
        ],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  localStorage.setItem('draftData', JSON.stringify(draftData, null, 2));

  return (
    <div className={styles.container}>
      <div className={styles.pptImageSection}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL_CDN}/${totalInfo.slides[currentPage].imageFilePath}`}
            width={500}
            height={281}
            alt={`${currentPage + 1}페이지 이미지`}
            style={{ borderRadius: '16px' }}
          />
        </div>
        <div className={styles.movePptButtons}>
          <button
            className={styles.moveButton}
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            이전 페이지
          </button>
          <button
            className={styles.moveButton}
            disabled={currentPage === totalInfo.slides.length - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            다음 페이지
          </button>
        </div>
      </div>
      <DragSection currentPage={currentPage} onChangeSlide={onChangeSlide} />
    </div>
  );
};

export default SelectSentenceSection;
