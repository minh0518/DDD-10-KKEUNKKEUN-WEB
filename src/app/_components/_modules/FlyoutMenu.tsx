import { ReactChildrenProps } from '@/types/common';
import styles from './FlyoutMenu.module.scss';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import useToggle, { ToggleType } from '@/app/_hooks/useToggle';
import useToggleContext, { ToggleContext } from '@/app/_hooks/useToggleContext';
import ModalLayout from './_modal/ModalLayout';

interface Props {
  /** 컨텍스트 (부모에서 전달이 필요한 경우를 위해) */
  context?: ToggleType;
  /** 자식 노드 */
  children: ReactNode;
}

const FlyoutMenu = ({ context, children }: Props) => {
  const flyoutContext = context ?? useToggle();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /** 모달 닫는 함수 선언 */
    const closeModal = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        flyoutContext.onClose();
      }
    };

    /** 이벤트 등록 */
    window.addEventListener('mousedown', closeModal);
    return () => {
      window.addEventListener('mousedown', closeModal);
    };
  }, [flyoutContext]);

  return (
    <ToggleContext.Provider value={flyoutContext}>
      <article className={styles.flyout} ref={ref}>
        {children}
      </article>
    </ToggleContext.Provider>
  );
};

const ToggleButton = ({ children }: ReactChildrenProps) => {
  const context = useToggleContext();

  const handleToggle = () => {
    if (context.isOpen) context.onClose();
    else context.onOpen();
  };

  return (
    <button className={styles.flyout__button} onClick={handleToggle}>
      {children}
    </button>
  );
};

const MenuList = ({ children }: ReactChildrenProps) => {
  const context = useToggleContext();

  if (!context.isOpen) return null;

  return <ul className={styles.flyout__list}>{children}</ul>;
};

const MenuItem = ({ children }: ReactChildrenProps) => {
  return <li className={styles.flyout__item}>{children}</li>;
};

FlyoutMenu.ToggleButton = ToggleButton;
FlyoutMenu.MenuList = MenuList;
FlyoutMenu.MenuItem = MenuItem;

export default FlyoutMenu;
