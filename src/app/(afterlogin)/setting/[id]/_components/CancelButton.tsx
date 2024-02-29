'use client';

import Confirm from '@/app/_components/_modules/_modal/Confirm';
import useToggle from '@/app/_hooks/useToggle';
import { ReactChildrenProps } from '@/types/common';
import { useRouter } from 'next/navigation';
import styles from './SettingNav.module.scss';

const CancelButton = ({ children }: ReactChildrenProps) => {
  const router = useRouter();
  const confirm = useToggle();

  return (
    <>
      <button
        onClick={() => {
          confirm.onOpen();
        }}
        className={styles.cancelButton}
      >
        {children}
      </button>
      <Confirm
        context={confirm}
        title="발표 목록으로 이동하시겠어요?"
        okayText="저장하고 이동하기"
        cancelText="계속 설정하기"
        onOkayClick={() => {
          router.push('/home');
          confirm.onClose();
        }}
      />
    </>
  );
};

export default CancelButton;
