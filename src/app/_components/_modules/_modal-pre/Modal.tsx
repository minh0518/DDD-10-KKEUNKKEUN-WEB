'use client';

import { useModalStore } from '@/store/modal';

import styles from './Modal.module.scss';
import AlertModal from '../AlertModal';
import ConfirmModal from '../ConfirmModal';

const Modal = () => {
  const { isOpen, modalData } = useModalStore();

  const { onCancelButton } = modalData;

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={styles.modalContainer}>
      {onCancelButton ? <ConfirmModal /> : <AlertModal />}
    </div>
  );
};

export default Modal;
