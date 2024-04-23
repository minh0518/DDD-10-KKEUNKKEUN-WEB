import Navbar from '@/app/(afterlogin)/_components/Navbar';
import styles from './layout.module.scss';
import { ReactChildrenProps } from '@/types/common';
import SettingNav from './_components/SettingNav';

const Layout = ({ children }: ReactChildrenProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
