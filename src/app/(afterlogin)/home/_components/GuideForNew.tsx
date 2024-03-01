'use client';

import Modal from '@/app/_components/_modules/_modal/Modal';
import useToggle from '@/app/_hooks/useToggle';
import { useEffect } from 'react';
import GuideContent from './GuideContent';

const GuideForNew = () => {
  const modal = useToggle();

  useEffect(() => {
    modal.onOpen();
  }, []);
  return (
    <>
      <Modal context={modal} size="lg" hasCloseBtn={false}>
        <GuideContent />
      </Modal>
    </>
  );
};

export default GuideForNew;
