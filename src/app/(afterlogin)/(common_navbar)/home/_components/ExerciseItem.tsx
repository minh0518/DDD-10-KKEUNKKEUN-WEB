'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './ExerciseItem.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';
import MenuIcon from './_svgs/MenuIcon';
import ModifyIcon from './_svgs/ModifyIcon';
import DeleteIcon from './_svgs/DeleteIcon';
import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';
import { PresentationListType } from '@/types/service';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDeletePresentation } from '../_hooks/presentationList';
import { CDN_BASE_URL } from '@/config/path';

interface Props {
  presentation: PresentationListType['page']['content'][0];
}

const ExerciseItem = ({ presentation }: Props) => {
  const router = useRouter();
  const flyout = useToggle();
  const modal = useToggle();

  const { mutate } = useDeletePresentation(presentation.id);

  const handleModify = () => {
    router.push(`/upload/${presentation.id}`);
    flyout.onClose();
  };

  const handleDelete = () => {
    flyout.onClose();
    modal.onOpen();
  };

  const deleteItem = () => {
    mutate();
  };

  return (
    <>
      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <Image
            src={`${CDN_BASE_URL}/${presentation.thumbnailPath}`}
            alt={`${presentation.id} 썸네일`}
            width={440}
            height={250}
            style={{ borderRadius: '16px' }}
          />
          <div className={styles.menu__box}>
            <FlyoutMenu context={flyout}>
              <FlyoutMenu.ToggleButton>
                <MenuIcon />
              </FlyoutMenu.ToggleButton>
              <FlyoutMenu.MenuList>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleModify}>
                    <ModifyIcon />
                    <span>수정</span>
                  </button>
                </FlyoutMenu.MenuItem>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleDelete}>
                    <DeleteIcon />
                    <span>삭제</span>
                  </button>
                </FlyoutMenu.MenuItem>
              </FlyoutMenu.MenuList>
            </FlyoutMenu>
          </div>
        </div>
        <div className={styles.info__box}>
          <div className={styles.info}>
            <ExerciseInfo presentation={presentation} />
          </div>
          <div className={styles.action__box}>
            <button
              className={styles.action}
              onClick={() => router.push(`/setting/${presentation.id}`)}
            >
              연습하기
            </button>
          </div>
        </div>
      </article>

      <Confirm
        context={modal}
        title="발표 연습 파일을 삭제하시겠어요?"
        message="삭제한 파일은 복원할 수 없습니다."
        okayText="삭제하기"
        cancelText="취소"
        onOkayClick={() => {
          deleteItem();
        }}
      />
    </>
  );
};

export default ExerciseItem;
