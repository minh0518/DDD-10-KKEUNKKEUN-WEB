import { Metadata } from 'next';

import RQProvider from './_components/RQProvider';
import { ReactChildrenProps } from '@/types/common';
import AlertModal from '../_components/_modules/AlertModal';
import ConfirmModal from '../_components/_modules/ConfirmModal';

export const metadata: Metadata = {
  title: '홈',
  description: 'HOME',
};

export default function AfterLoginLayout({ children }: ReactChildrenProps) {
  return (
    <div>
      <RQProvider>
        <div>{children}</div>
        <AlertModal />
        <ConfirmModal />
      </RQProvider>
    </div>
  );
}
