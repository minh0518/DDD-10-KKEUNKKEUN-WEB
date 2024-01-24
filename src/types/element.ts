import { ButtonHTMLAttributes, InputHTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

export interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _content: React.ReactNode;
  _className?: string;
  // _onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface SingleList extends LiHTMLAttributes<HTMLLIElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _content: React.ReactNode;
  _className?: string;
}
export type ListProp = SingleList[];

export interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
  _className?: string;
}

/** 체크박스 컴포넌트 prop */
export interface CheckboxProp extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 */
  _label?: string;
  /** 체크 여부 */
  _isChecked: boolean;
  /** 체크 여부 변경 핸들러 */
  _onChange: () => void;
}

/** 토글 버튼 컴포넌트 prop */
export interface ToggleButtonProp extends CheckboxProp {
  /** 레이블 활성화 여부
   *
   * - true: 레이블 클릭 시에도 토글 버튼 on/off
   * - false: 레이블 클릭 시 이벤트 없음
   */
  _activedLabel?: boolean;
}
