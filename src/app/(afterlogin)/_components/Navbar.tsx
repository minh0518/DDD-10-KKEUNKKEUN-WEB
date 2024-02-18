import NavMenu from './NavMenu';
import LogoIcon from '@/app/_svgs/LogoIcon';
import styles from './Navbar.module.scss';
import UserIcon from '../_svgs/UserIcon';

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LogoIcon color="white" />
          <NavMenu />
        </div>

        <div className={styles.right}>
          <UserIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
