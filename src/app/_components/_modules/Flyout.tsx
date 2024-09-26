import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './FlyoutMenu.module.scss';

interface Props {
  toggleButton: ReactNode;
  children: ReactNode;
}

const Flyout = ({ toggleButton, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeModal = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', closeModal);
    return () => {
      window.removeEventListener('mousedown', closeModal);
    };
  }, []);

  return (
    <div ref={ref}>
      <button className={styles.flyout__button} onClick={() => setIsOpen((prev) => !prev)}>
        {toggleButton}
      </button>
      {/* {children}에서 ul, li형태로 감싸진 버튼을 주든, 단일 버튼을 주든 외부에서 자유롭게 주입 */}
      {isOpen && <article className={styles.flyout}>{children}</article>}
    </div>
  );
};

export default Flyout;
