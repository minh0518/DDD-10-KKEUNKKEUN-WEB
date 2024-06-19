import { ReactChildrenProps } from '@/types/common';
import styles from './FlyoutMenu.module.scss';
import { ReactNode, useEffect, useRef } from 'react';
import { ToggleType } from '@/app/_hooks/useToggle';
import useToggleContext, { ToggleContext } from '@/app/_hooks/useToggleContext';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  /** 컨텍스트 (부모에서 전달이 필요한 경우를 위해) */
  context: ToggleType;
  /** 자식 노드 */
  children: ReactNode;
}

const FlyoutMenu = ({ context, children }: Props) => {
  const flyoutContext = context;
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
      window.removeEventListener('mousedown', closeModal);
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

const MenuList = ({ children, className }: ReactChildrenProps & { className?: string }) => {
  const context = useToggleContext();

  // ToggleButton은 계속 유지한 체, flyout의 메뉴들만 보여주거나 없애거나
  if (!context.isOpen) return null;

  // 로그아웃의 flyout버튼은 위치가 조금 다르므로, 이에 대한 className을 조건부로 사용
  return <ul className={cx([className ? `${className}` : 'flyout__list'])}>{children}</ul>;
};

const MenuItem = ({ children }: ReactChildrenProps) => {
  return <li className={styles.flyout__item}>{children}</li>;
};

FlyoutMenu.ToggleButton = ToggleButton;
FlyoutMenu.MenuList = MenuList;
FlyoutMenu.MenuItem = MenuItem;

export default FlyoutMenu;
