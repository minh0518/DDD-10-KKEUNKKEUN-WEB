'use client';

import { useConfirmModalStore } from '@/store/modal';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
  const { isOpen, modalData, closeModal } = useConfirmModalStore();

  const { children, onCancel, onSubmit } = modalData;

  if (!isOpen) {
    return <></>;
  }

  const onCancelInternal = () => {
    onCancel?.();
    closeModal();
  };

  const onSubmitInternal = () => {
    onSubmit?.();
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div onClick={closeModal}>x</div>
        <div>
          <div>{children}</div>
          <div>
            <button onClick={onCancelInternal}>cancel</button>
            <button onClick={onSubmitInternal}>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
