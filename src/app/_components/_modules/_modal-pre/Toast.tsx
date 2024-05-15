'use client';

import { useState, useLayoutEffect } from 'react';

import styles from './Toast.module.scss';

import classNames from 'classnames/bind';
import { useToastStore } from '@/store/modal';

const Toast = () => {
  const { isOpen, toastData, closeToast } = useToastStore();

  const { content } = toastData;

  const [fadeOut, setFadeOut] = useState(false);

  const cx = classNames.bind(styles);

  useLayoutEffect(() => {
    if (isOpen) {
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(closeToast, 500);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeToast]);

  if (!isOpen) {
    return <></>;
  }

  return <div className={cx(['toastContainer', fadeOut && 'fadeOut'])}>{content}</div>;
};

export default Toast;
