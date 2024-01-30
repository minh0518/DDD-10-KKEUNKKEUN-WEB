'use client';

import { useModalStore } from '@/store/modal';

import styles from './AlertModal.module.scss';

const AlertModal = () => {
  const { modalData, closeModal } = useModalStore();

  // alert는 취소 버튼이 없으므로 onSubmitButton 만 진행
  const { content, onSubmitButton } = modalData;

  return (
    <div className={styles.modalContent}>
      <div>{content}</div>
      <button className={styles.closeButton} onClick={closeModal}>
        x
      </button>
      {onSubmitButton}
    </div>
  );
};

export default AlertModal;
