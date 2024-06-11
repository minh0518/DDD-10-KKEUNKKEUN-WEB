'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './CardItem.module.scss';

import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';
import { CardListType } from '@/types/service';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import DeleteIcon from '../home/_components/_svgs/DeleteIcon';
import ModifyIcon from '../home/_components/_svgs/ModifyIcon';
import MenuIcon from '../home/_components/_svgs/MenuIcon';
import { useDeletePresentation } from '../home/_hooks/presentationList';
import CardInfo from './CardInfo';
import PracticeButton from './_Home/PracticeButton';
import FeedbackScoreButton from './_Feedback/FeedbackScoreButton';
import { FeedbackListTypeGuard, PresentationListTypeGuard } from '@/types/guards';
import { CDN_BASE_URL } from '@/config/path';
import { ReactNode } from 'react';
import FailFeedback from './_Feedback/FailFeedback';

interface Props {
  listInfo: CardListType;
}

const CardItem = ({ listInfo }: Props) => {
  const router = useRouter();
  const flyout = useToggle();
  const modal = useToggle();
  const pathname = usePathname();
  const usage: 'feedback' | 'home' = pathname === `/feedback/list` ? 'feedback' : 'home';

  const { mutate: presentationListMutate } = useDeletePresentation(listInfo.id);

  const handleModify = () => {
    router.push(`/upload/${listInfo.id}`);
    flyout.onClose();
  };

  const handleDelete = () => {
    flyout.onClose();
    modal.onOpen();
  };

  const getThumbnailImg = (): ReactNode => {
    if (PresentationListTypeGuard(listInfo)) {
      return listInfo.thumbnailPath ? (
        <Image
          src={`${CDN_BASE_URL}/${listInfo.thumbnailPath}`}
          alt={`${listInfo.id} 썸네일`}
          width={440}
          height={250}
          style={{ borderRadius: '16px' }}
        />
      ) : (
        <div className={styles.dummyImg} />
      );
    }
    if (FeedbackListTypeGuard(listInfo)) {
      if (listInfo.status === 'FAIL') {
        return <FailFeedback />;
      }
      if (
        (listInfo.status === 'DONE' || listInfo.status === 'IN_PROGRESS') &&
        listInfo.thumbnailPath
      ) {
        return (
          <Image
            src={`${CDN_BASE_URL}/${listInfo.thumbnailPath}`}
            alt={`${listInfo.id} 썸네일`}
            width={440}
            height={250}
            style={{ borderRadius: '16px' }}
          />
        );
      } else {
        return <div className={styles.dummyImg} />;
      }
    }
  };

  return (
    <>
      <article className={styles.container}>
        <div className={styles.thumbnail}>
          {getThumbnailImg()}
          <div className={styles.menu__box}>
            {usage === 'home' && (
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
            )}
          </div>
        </div>
        <div className={styles.infoBox}>
          <CardInfo listInfo={listInfo} />
          <div>
            {usage === 'home' && PresentationListTypeGuard(listInfo) && (
              <PracticeButton id={listInfo.id} />
            )}
            {usage === 'feedback' && FeedbackListTypeGuard(listInfo) && (
              <FeedbackScoreButton
                status={listInfo.status}
                score={listInfo.totalScore}
                onClick={() => router.push(`/feedback/${listInfo.id}`)}
              />
            )}
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
          presentationListMutate();
        }}
      />
    </>
  );
};

export default CardItem;
