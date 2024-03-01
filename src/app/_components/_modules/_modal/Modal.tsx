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
  /** dimmed 영역을 눌러서 닫기 여부 (기본값 : true) */
  hasClosedDim?: boolean;
}

const Modal = ({
  context,
  size = 'sm',
  hasCloseBtn = true,
  children,
  hasClosedDim = true,
}: Props) => {
  const cx = classNames.bind(styles);

  const handleClose = () => {
    if (hasCloseBtn) {
      context.onClose();
    }
  };

  return (
    <ToggleContext.Provider value={context}>
      <ModalLayout hasClosedDim={hasClosedDim}>
        <div className={cx(['container', `container--${size}`])}>
          {hasCloseBtn ? (
            <div className={cx('header')}>
              <button onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          ) : null}
          {children}
        </div>
      </ModalLayout>
    </ToggleContext.Provider>
  );
};

export default Modal;
