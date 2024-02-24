import styles from './Modal.module.scss';
import { ToggleType } from '@/app/_hooks/useToggle';
import { ToggleContext } from '@/app/_hooks/useToggleContext';
import ModalLayout from './ModalLayout';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import CloseIcon from '@/app/_svgs/CloseIcon';

interface Props {
  /** 컨텍스트 */
  context: ToggleType;
  /** 모달 사이즈 (기본 값 : sm) */
  size?: 'sm' | 'lg';
  /** 상단 닫기 버튼 여부 (기본 값 : true) */
  hasCloseBtn?: boolean;
  /** 자식 노드 */
  children: ReactNode;
}

const Modal = ({ context, size = 'sm', hasCloseBtn = true, children }: Props) => {
  const cx = classNames.bind(styles);

  return (
    <ToggleContext.Provider value={context}>
      <ModalLayout>
        <div className={cx(['container', `container--${size}`])}>
          {hasCloseBtn ? (
            <div className={cx('header')}>
              <CloseIcon />
            </div>
          ) : null}
          {children}
        </div>
      </ModalLayout>
    </ToggleContext.Provider>
  );
};

export default Modal;
