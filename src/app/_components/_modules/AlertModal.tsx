'use client';

import { useState, useEffect } from 'react';

import { useAlertModalStore } from '@/store/modal';

import styles from './AlertModal.module.scss';

import Button from '../_elements/Button';

import classNames from 'classnames/bind';

const AlertModal = () => {
  const { isOpen, modalData, closeModal } = useAlertModalStore();
  const { children } = modalData;
  const [fadeOut, setFadeOut] = useState(false);

  const cx = classNames.bind(styles);

  useEffect(() => {
    if (isOpen) {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(closeModal, 500); // 0.5초 후에 모달창 닫기
      }, 1000); // 1초 후에 fadeOut 시작

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={cx(['modalContainer', fadeOut && 'fadeOut'])}>
      <div className={styles.modalContent}>
        <div>{children}</div>
        <Button onClick={() => setFadeOut(true)} _content={'x'} _className={styles.closeButton} />
      </div>
    </div>
  );
};

export default AlertModal;
