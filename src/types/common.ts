import { ReactNode } from 'react';

export interface ReactChildrenProps {
  children: ReactNode;
}

export interface ButtonInfoType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  _onClick: () => void;
  _type?: 'button' | 'submit' | 'reset';
  _disabled?: boolean;
  _className?: string; // 각 버튼의 className
}

export type ListInfoType = Array<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  _className?: string; // 각 리스트의 className
}>;
