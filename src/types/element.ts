import { ButtonHTMLAttributes, InputHTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

/** 버튼 컴포넌트 prop */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내 자식 컴포넌트 */
  _content: React.ReactNode;
  /** 버튼 스타일 */
  _className?: string;
}

// TODO: 타입 주석 필요
interface SingleList extends LiHTMLAttributes<HTMLLIElement> {
  _content: React.ReactNode;
  _className?: string;
}
export type ListProps = SingleList[];

/** 인풋 컴포넌트 prop */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 인풋 스타일 */
  _className?: string;
}

/** 체크박스 컴포넌트 prop */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 */
  _label?: string;
  /** 체크 여부 */
  _isChecked: boolean;
  /** 체크 여부 변경 핸들러 */
  _onChange: () => void;
}

/** 토글 버튼 컴포넌트 prop */
export interface ToggleButtonProps extends CheckboxProps {
  /** 레이블 활성화 여부
   *
   * - true: 레이블 클릭 시에도 토글 버튼 on/off
   * - false: 레이블 클릭 시 이벤트 없음
   */
  _activedLabel?: boolean;
}

/** 타임피커 컴포넌트 prop */
export interface TimePickerProps {
  /** 시간 타입 */
  type: 'hour' | 'minute' | 'second';
  /** 최소 값 (기본값 : 0)*/
  min?: number;
  /** 최대 값 (기본값:  hour-23, minute, second-59)*/
  max?: number;
  /** 시간 간격 (기본값:  hour-1, minute, second-30)*/
  gap?: number;
  /** 선택된 값 */
  selectedValue: string;
  /** 선택 값 변경 핸들러 */
  onChange: (value: TimePickerProps['selectedValue']) => void;
}
