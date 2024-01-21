import { ButtonHTMLAttributes, InputHTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

export interface ButtonInfoType extends ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _content: React.ReactNode;
  _className?: string;
  // _onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface SingleListType extends LiHTMLAttributes<HTMLLIElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _content: React.ReactNode;
  _className?: string;
}
export type ListInfoType = SingleListType[];

export interface InputInfoType extends InputHTMLAttributes<HTMLInputElement> {
  _className?: string;
}
