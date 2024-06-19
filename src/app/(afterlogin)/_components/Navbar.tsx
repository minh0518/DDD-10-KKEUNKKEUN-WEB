import NavMenu from './NavMenu';
import styles from './Navbar.module.scss';
import LogoIcon from '@/app/_svgs/LogoIcon';

import { serverUserApi } from '@/services/server/user';
import { fetch_ServerAuth } from '@/services/server/fetchServer';
import LogoutIcon from './LogoutIcon';
import UserIcon from '../_svgs/UserIcon';

const Navbar = async () => {
  // const res = await fetch_ServerAuth(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/accounts/me`, {
  //   method: 'GET',
  //   headers: { Cookie: cookies().toString() },
  //   cache: 'no-store',
  // });

  const res = await serverUserApi.getUserInfo();
  console.log(await res.json());

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LogoIcon />
          <NavMenu />
        </div>

        <div className={styles.right}>
          <LogoutIcon />
          {/* <UserIcon /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
