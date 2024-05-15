'use client';

import { useModalStore } from '@/store/modal';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
  const { modalData } = useModalStore();

  const { content, onCancelButton, onSubmitButton } = modalData;

  return (
    <div className={styles.modalContent}>
      {content}

      <div className={styles.actionButtons}>
        {onSubmitButton}
        {onCancelButton}
      </div>
    </div>
  );
};

export default ConfirmModal;
