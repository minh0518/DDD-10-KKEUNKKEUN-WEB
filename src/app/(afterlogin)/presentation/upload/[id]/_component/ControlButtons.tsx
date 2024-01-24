'use client';

import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import Button from '@/app/_components/_elements/Button';
import { PagesDataType } from '@/types/service';
import styles from './ControlButtons.module.scss';
import classNames from 'classnames/bind';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

const cx = classNames.bind(styles);

interface ControlButtonsProps {
  presentationData: PagesDataType;
  setPresentationData: Dispatch<SetStateAction<PagesDataType>>;
  currentPageIndex: number;
  setCurrpentPageIndex: Dispatch<SetStateAction<number>>;
  initialState: PagesDataType;
  slug?: string;
}

const ControlButtons = ({
  presentationData,
  setPresentationData,
  currentPageIndex,
  setCurrpentPageIndex,
  slug,
  initialState,
}: ControlButtonsProps) => {
  const addButton = () => {
    // 마지막 페이지(=작성 중이던 페이지)에서 눌렀다면 새로 추가
    if (currentPageIndex === presentationData.scripts.length - 1) {
      setPresentationData((prev) => {
        const shallow = [...prev.scripts];
        shallow.push(initialState.scripts[0]);

        return {
          ...prev,
          scripts: shallow,
        };
      });
      setCurrpentPageIndex((prev) => prev + 1);
    } else {
      // 다른 페이지에 있었다면 마지막 페이지로 다시 복귀
      setCurrpentPageIndex(presentationData.scripts.length - 1);
    }
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
      setCurrpentPageIndex((prev) => (prev === 0 ? 0 : prev - 1));
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
                          onClick={() => setCurrpentPageIndex(index)}
                          className={cx('singlePptPage', {
                            selected: currentPageIndex === index,
                          })}
                        >
                          <Image
                            src={item.ppt!.dataURL as string}
                            fill
                            alt="ppt이미지"
                            style={{ objectFit: 'contain' }}
                          />
                          <Button
                            onClick={(e) => remove(e, index)}
                            _content={'x'}
                            className={styles.closeButton}
                          />
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button
                onClick={addButton}
                disabled={
                  presentationData.scripts[currentPageIndex].ppt.dataURL === null
                  // || presentationData.scripts[currentPageIndex].ppt.file === null
                }
                _content={
                  <div
                    style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3456 11.3477L18.0745 11.3468C18.2532 11.3499 18.4307 11.3174 18.5967 11.2511C18.7627 11.1849 18.9138 11.0863 19.0412 10.961C19.1687 10.8358 19.2699 10.6864 19.339 10.5216C19.4081 10.3568 19.4437 10.1799 19.4437 10.0012C19.4437 9.82246 19.4081 9.64555 19.339 9.48075C19.2699 9.31595 19.1687 9.16656 19.0412 9.04131C18.9138 8.91605 18.7627 8.81743 18.5967 8.7512C18.4307 8.68497 18.2532 8.65246 18.0745 8.65557L11.3456 8.65462L11.3456 1.92664C11.3487 1.74796 11.3162 1.57046 11.25 1.40448C11.1837 1.23851 11.0851 1.08738 10.9599 0.959929C10.8346 0.832475 10.6852 0.731243 10.5204 0.662141C10.3556 0.593038 10.1787 0.557448 10 0.557448C9.8213 0.557448 9.64439 0.593038 9.47959 0.662141C9.31479 0.731243 9.1654 0.832475 9.04014 0.959929C8.91489 1.08738 8.81626 1.23851 8.75004 1.40448C8.68381 1.57046 8.6513 1.74796 8.6544 1.92664L8.6544 8.65462L1.92547 8.65557C1.7468 8.65246 1.56929 8.68497 1.40332 8.7512C1.23734 8.81743 1.08622 8.91605 0.958766 9.04131C0.831312 9.16656 0.730079 9.31595 0.660977 9.48075C0.591874 9.64555 0.556285 9.82246 0.556285 10.0012C0.556285 10.1799 0.591875 10.3568 0.660977 10.5216C0.73008 10.6864 0.831312 10.8358 0.958766 10.961C1.08622 11.0863 1.23734 11.1849 1.40332 11.2511C1.56929 11.3174 1.7468 11.3499 1.92547 11.3468L8.65345 11.3468L8.6544 18.0757C8.6513 18.2544 8.68381 18.4319 8.75004 18.5978C8.81627 18.7638 8.91488 18.9149 9.04014 19.0424C9.1654 19.1699 9.31479 19.2711 9.47959 19.3402C9.64439 19.4093 9.8213 19.4449 10 19.4449C10.1787 19.4449 10.3556 19.4093 10.5204 19.3402C10.6852 19.2711 10.8346 19.1699 10.9599 19.0424C11.0851 18.9149 11.1837 18.7638 11.25 18.5978C11.3162 18.4319 11.3487 18.2544 11.3456 18.0757L11.3465 11.3468L11.3456 11.3477Z"
                        fill="#1E1E1E"
                      />
                    </svg>
                  </div>
                }
                className={cx('addButton', {
                  selected: currentPageIndex === presentationData.scripts.length - 1,
                })}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ControlButtons;
