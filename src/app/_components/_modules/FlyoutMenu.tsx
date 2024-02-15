import { ReactChildrenProps } from '@/types/common';
import styles from './FlyoutMenu.module.scss';
import { createContext, useContext, useState } from 'react';

interface FlyoutContext {
  open: boolean;
  toggle: (value: boolean) => void;
}

const FlyoutContext = createContext<FlyoutContext | null>(null);

const FlyoutMenu = ({ children }: ReactChildrenProps) => {
  const [open, toggle] = useState(false);

  return (
    <FlyoutContext.Provider value={{ open, toggle }}>
      <article className={styles.flyout}>{children}</article>
    </FlyoutContext.Provider>
  );
};

const ToggleButton = ({ children }: ReactChildrenProps) => {
  const context = useContext(FlyoutContext);

  if (!context) return;

  const { open, toggle } = context;

  return (
    <button className={styles.flyout__button} onClick={() => toggle(!open)}>
      {children}
    </button>
  );
};

const MenuList = ({ children }: ReactChildrenProps) => {
  const context = useContext(FlyoutContext);

  if (!context) return;

  const { open } = context;

  return open && <ul className={styles.flyout__list}>{children}</ul>;
};

const MenuItem = ({ children }: ReactChildrenProps) => {
  return <li className={styles.flyout__item}>{children}</li>;
};

FlyoutMenu.ToggleButton = ToggleButton;
FlyoutMenu.MenuList = MenuList;
FlyoutMenu.MenuItem = MenuItem;

export default FlyoutMenu;
