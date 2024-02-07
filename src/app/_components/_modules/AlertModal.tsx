'use client';

import { useModalStore } from '@/store/modal';

import styles from './AlertModal.module.scss';

const AlertModal = () => {
  const { modalData, closeModal } = useModalStore();

  // alert는 취소 버튼이 없으므로 onSubmitButton 만 진행
  const { content, onSubmitButton } = modalData;

  return (
    <div className={styles.modalContent}>
      {content}
      <div className={styles.actionButtons}>{onSubmitButton}</div>
    </div>
  );
};

export default AlertModal;
