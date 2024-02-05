import { Metadata } from 'next';

import RQProvider from './_components/RQProvider';
import { ReactChildrenProps } from '@/types/common';

import Modal from '../_components/_modules/_modal/Modal';
import Toast from '../_components/_modules/_modal/Toast';
import Navbar from './_components/Navbar';

export const metadata: Metadata = {
  title: '홈',
  description: 'HOME',
};

export default function AfterLoginLayout({ children }: ReactChildrenProps) {
  return (
    <div>
      <RQProvider>
        <Navbar />
        <div>{children}</div>
        <Toast />
        <Modal />
      </RQProvider>
    </div>
  );
}
