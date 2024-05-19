import { ReactChildrenProps } from '@/types/common';

export default function BeforeLoginLayout({ children }: ReactChildrenProps) {
  return <div style={{ height: '100%' }}>{children}</div>;
}
