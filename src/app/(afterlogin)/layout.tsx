import { Metadata } from 'next';

import RQProvider from './_components/RQProvider';
import { ReactChildrenProps } from '@/types/common';

export const metadata: Metadata = {
  title: '홈',
  description: 'HOME',
};

export default function AfterLoginLayout({ children }: ReactChildrenProps) {
  return (
    <div>
      <RQProvider>
        <div>{children}</div>
      </RQProvider>
    </div>
  );
}
