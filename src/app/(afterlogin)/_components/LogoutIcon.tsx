'use client';

import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import useToggle from '@/app/_hooks/useToggle';
import styles from './LogoutIcon.module.scss';
import { useRouter } from 'next/navigation';

const LogoutIcon = () => {
  const flyout = useToggle();
  const router = useRouter();

  const logout = async () => {
    // await fetch(`${ROUTE_HANDLER_BASE_URL}/api/get/logout`, {
    //   method: 'GET',
    // });
    router.push(`/logout`);
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <FlyoutMenu context={flyout}>
        <FlyoutMenu.ToggleButton>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M15 15C19.1438 15 22.5 11.6438 22.5 7.5C22.5 3.35625 19.1438 0 15 0C10.8562 0 7.5 3.35625 7.5 7.5C7.5 11.6438 10.8562 15 15 15ZM15 18.75C9.99375 18.75 0 21.2625 0 26.25V30H30V26.25C30 21.2625 20.0063 18.75 15 18.75Z"
                fill="#BFBFBF"
              />
            </svg>
          </i>
        </FlyoutMenu.ToggleButton>
        <FlyoutMenu.MenuList className={styles.logoutList}>
          <FlyoutMenu.MenuItem>
            <button className={styles.menu} onClick={logout}>
              <span>로그아웃</span>
            </button>
          </FlyoutMenu.MenuItem>
        </FlyoutMenu.MenuList>
      </FlyoutMenu>
    </div>
  );
};

export default LogoutIcon;
