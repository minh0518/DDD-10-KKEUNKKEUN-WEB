'use client';
import React from 'react';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

import Image from 'next/image';

import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import { FieldErrors, UseFormGetValues } from 'react-hook-form';

import { UploadDataType, ValidtaionType } from '@/types/service';

import { MAX_LENGTH } from '@/config/const';
import PptImageSvgs from '../_svgs/PptImgSvgs';
import { CDN_BASE_URL } from '@/config/path';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: UploadDataType;
  setPresentationData: Dispatch<SetStateAction<UploadDataType>>;
  currentPageIndex: number;
  slug?: string;
  changeCurrentPageIndex: (nextIndex: number) => void;
  getValues: UseFormGetValues<ValidtaionType>;
  errors: FieldErrors<ValidtaionType>;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  changeCurrentPageIndex,
  getValues,
  errors,
}: ControlButtonsProps) => {
  const remove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      shallow.splice(index, 1);

      return {
        ...prev,
        slides: shallow,
      };
    });

    // 삭제 시, 관련 페이지 인덱스 당기기
    if (index <= currentPageIndex) {
      const target = currentPageIndex === 0 ? 0 : currentPageIndex - 1;
      changeCurrentPageIndex(target);
    }
  };

  const handleChange = (result: DropResult) => {
    if (
      !result.destination ||
      errors.script ||
      errors.memo ||
      getValues('script').length > MAX_LENGTH.SCRIPT ||
      getValues('script').length === 0 ||
      getValues('memo').length > MAX_LENGTH.MEMO
    )
      return;

    const to = result.destination?.index;
    const from = result.source.index;

    setPresentationData((prev) => {
      const shallow = [...prev.slides];
      const moveTarget = shallow.splice(from, 1);
      shallow.splice(to, 0, ...moveTarget);

      return {
        ...prev,
        slides: shallow,
      };
    });
  };

  const eachPptButtonClick = (index: number) => {
    changeCurrentPageIndex(index);

    if (
      errors.script ||
      errors.memo ||
      getValues('script').length > MAX_LENGTH.SCRIPT ||
      getValues('script').length === 0 ||
      getValues('memo').length > MAX_LENGTH.MEMO
    )
      return;
    setPresentationData((prev) => {
      const shallow = { ...prev };
      shallow.title = getValues('title');
      shallow.timeLimit.hours = Number(getValues('timeLimit_hour'));
      shallow.timeLimit.minutes = Number(getValues('timeLimit_minute'));
      shallow.alertTime.hours = Number(getValues('alertTime_hour'));
      shallow.alertTime.minutes = Number(getValues('alertTime_minute'));

      const shallowSlides = [...shallow.slides];
      shallowSlides[currentPageIndex] = {
        ...shallowSlides[currentPageIndex],
        script: getValues('script'),
        memo: getValues('memo'),
      };
      return {
        ...shallow,
        slides: shallowSlides,
      };
    });
  };

  const onStart = () => {
    if (
      errors.script ||
      errors.memo ||
      getValues('script').length > MAX_LENGTH.SCRIPT ||
      getValues('script').length === 0 ||
      getValues('memo').length > MAX_LENGTH.MEMO
    )
      return;
    setPresentationData((prev) => {
      const shallow = { ...prev };
      shallow.title = getValues('title');
      shallow.timeLimit.hours = Number(getValues('timeLimit_hour'));
      shallow.timeLimit.minutes = Number(getValues('timeLimit_minute'));
      shallow.alertTime.hours = Number(getValues('alertTime_hour'));
      shallow.alertTime.minutes = Number(getValues('alertTime_minute'));

      const shallowSlides = [...shallow.slides];
      shallowSlides[currentPageIndex] = {
        ...shallowSlides[currentPageIndex],
        script: getValues('script'),
        memo: getValues('memo'),
      };
      return {
        ...shallow,
        slides: shallowSlides,
      };
    });
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragStart={onStart} onDragEnd={handleChange}>
        <Droppable droppableId={styles.buttons} direction="horizontal">
          {(provided) => (
            <div className={styles.buttons} {...provided.droppableProps} ref={provided.innerRef}>
              {presentationData.slides.slice(0, -1).map((item, index) => (
                <Draggable draggableId={`test-${index}`} index={index} key={`test-${index}`}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div
                          key={index}
                          // onClick={() => changeCurrentPageIndex(index)}
                          onClick={() => eachPptButtonClick(index)}
                          className={cx('singlePptPage', {
                            selected: currentPageIndex === index,
                          })}
                        >
                          <Image
                            src={`${CDN_BASE_URL}${item.imageFilePath}`}
                            fill
                            alt="ppt이미지"
                            style={{ borderRadius: '8px' }}
                          />
                          <button onClick={(e) => remove(e, index)} className={styles.closeButton}>
                            <PptImageSvgs>
                              <PptImageSvgs.X />
                            </PptImageSvgs>
                          </button>
                          <div
                            className={cx([
                              'orderNumber',
                              currentPageIndex === index && 'selected',
                            ])}
                          >
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
              <button
                // onClick={addButton}
                onClick={() => eachPptButtonClick(presentationData.slides.length - 1)}
                disabled={presentationData.slides[currentPageIndex].imageFilePath === null}
                className={cx('addButton', {
                  selected: currentPageIndex === presentationData.slides.length - 1,
                })}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}
                >
                  <PptImageSvgs>
                    <PptImageSvgs.AddNewPpt />
                  </PptImageSvgs>
                </div>
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default React.memo(ControlButtons);
