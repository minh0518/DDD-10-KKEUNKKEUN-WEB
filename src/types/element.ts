import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

// #region Button
/** 버튼 컴포넌트 prop */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내 자식 컴포넌트 */
  _content: ReactNode; // TODO: 수정 논의 필요
  /** 버튼 스타일 */
  _className?: string;
}
// #endregion

// #region List
/** 단일 리스트(li) 타입  */
interface SingleList extends LiHTMLAttributes<HTMLLIElement> {
  /** li 내 자식 컴포넌트 */
  _content: ReactNode; // TODO: 수정 논의 필요
  /** li 태그 스타일  */
  _className?: string;
}

/** ul안에 들어갈 li태그 배열
 *
 * TODO: 수정 논의 해봐요
 */
export type ListProps = SingleList[];
// #endregion

// #region Input
/** input 태그 value 속성 타입 */
type InputValue = InputHTMLAttributes<HTMLInputElement>['value'];

/** 인풋 컴포넌트 prop */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 인풋 스타일 */
  _className?: string;
}

/** textarea 컴포넌트 prop */
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** textarea 테마 */
  // theme?: 'presentation_memo' | 'presentation_script';
  _className?: string;
  size?: 'size_lg' | 'size_md';
  width?: 'width_full';
  theme?: 'theme_gray';
  warning?: boolean;
}

/** 체크박스 컴포넌트 prop */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 */
  _label?: string;
}

/** 토글 버튼 컴포넌트 prop */
export interface SwitchProps extends CheckboxProps {
  /** 레이블 활성화 여부
   *
   * - true: 레이블 클릭 시에도 토글 버튼 on/off
   * - false: 레이블 클릭 시 이벤트 없음
   */
  _activedLabel?: boolean;
}

/** 라디오 컴포넌트 prop */
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 */
  _label?: string;
  /** 선택된 값 */
  _selectedValue: InputValue;
  /** 선택된 값 변경 핸들러 */
  _onChangeSelected: (value: InputValue) => void;
}
// #endregion

// #region Custom
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
// #endregion
