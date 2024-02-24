import { Metadata } from 'next';

import RQProvider from './_components/RQProvider';
import { ReactChildrenProps } from '@/types/common';

import Toast from '../_components/_modules/_modal-pre/Toast';

export const metadata: Metadata = {
  title: '홈',
  description: 'HOME',
};

export default function AfterLoginLayout({ children }: ReactChildrenProps) {
  return (
    <div>
      <RQProvider>
        <div>{children}</div>
        <Toast />
      </RQProvider>
    </div>
  );
}
