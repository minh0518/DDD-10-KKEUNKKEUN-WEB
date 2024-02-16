'use client';

import { Dispatch, MouseEvent, SetStateAction } from 'react';

import Image from 'next/image';

import { PagesDataType } from '@/types/service';

import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import PptImageSvgs from '@/app/(afterlogin)/upload/[id]/_component/_svgs/PptImgSvgs';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  slug?: string;
  changeCurrentPageIndex: (nextIndex: number) => void;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  slug,
  changeCurrentPageIndex,
}: ControlButtonsProps) => {
  const addButton = async () => {
    changeCurrentPageIndex(presentationData.scripts.length - 1);
  };

  const remove = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    setPresentationData((prev) => {
      const shallow = [...prev.scripts];
      shallow.splice(index, 1);

      return {
        ...prev,
        scripts: shallow,
      };
    });

    // 삭제 시, 관련 페이지 인덱스 당기기
    if (index <= currentPageIndex) {
      const target = currentPageIndex === 0 ? 0 : currentPageIndex - 1;
      changeCurrentPageIndex(target);
    }
  };

  const handleChange = (result: DropResult) => {
    if (!result.destination) return;
    const to = result.destination?.index;
    const from = result.source.index;

    setPresentationData((prev) => {
      const shallow = [...prev.scripts];
      const moveTarget = shallow.splice(from, 1);
      shallow.splice(to, 0, ...moveTarget);

      return {
        ...prev,
        scripts: shallow,
      };
    });
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId={styles.buttons} direction="horizontal">
          {(provided) => (
            <div className={styles.buttons} {...provided.droppableProps} ref={provided.innerRef}>
              {presentationData.scripts.slice(0, -1).map((item, index) => (
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
                          onClick={() => changeCurrentPageIndex(index)}
                          className={cx('singlePptPage', {
                            selected: currentPageIndex === index,
                          })}
                        >
                          <Image
                            src={item.ppt!.dataURL as string}
                            fill
                            alt="ppt이미지"
                            style={{ objectFit: 'contain', borderRadius: '8px' }}
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
                onClick={addButton}
                disabled={
                  presentationData.scripts[currentPageIndex].ppt.dataURL === null
                  // || presentationData.scripts[currentPageIndex].ppt.file === null
                }
                className={cx('addButton', {
                  selected: currentPageIndex === presentationData.scripts.length - 1,
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

export default ControlButtons;
