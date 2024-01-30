'use client';

import { useModalStore } from '@/store/modal';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
  const { modalData, closeModal } = useModalStore();

  const { content, onCancelButton, onSubmitButton } = modalData;

  return (
    <div className={styles.modalContent}>
      <div>{content}</div>
      <button className={styles.closeButton} onClick={closeModal}>
        x
      </button>
      <div className={styles.actionButtons}>
        {onSubmitButton}
        {onCancelButton}
      </div>
    </div>
  );
};

export default ConfirmModal;
