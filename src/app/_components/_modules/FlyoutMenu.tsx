import { ReactChildrenProps } from '@/types/common';
import { useFlyoutStore } from '@/store/flyout';
import Button from '../_elements/Button';
import styles from './FlyoutMenu.module.scss';

const FlyoutMenu = ({ children }: ReactChildrenProps) => {
  return <div>{children}</div>;
};

const ToggleButton = ({ children }: ReactChildrenProps) => {
  const { toggle } = useFlyoutStore();

  return <Button _content={children} onClick={toggle} />;
};

const MenuList = ({ children }: ReactChildrenProps) => {
  const { isOpen } = useFlyoutStore();

  return isOpen && <ul className={styles.flyout__menu}>{children}</ul>;
};

const MenuItem = ({ children }: ReactChildrenProps) => {
  return <li>{children}</li>;
};

FlyoutMenu.ToggleButton = ToggleButton;
FlyoutMenu.MenuList = MenuList;
FlyoutMenu.MenuItem = MenuItem;

export default FlyoutMenu;
