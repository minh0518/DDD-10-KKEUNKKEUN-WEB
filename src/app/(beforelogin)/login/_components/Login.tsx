import styles from './Login.module.scss';

import LoginForm from './LoginForm';
import LoginMenus from './LoginMenus';
import OAuthMenu from './OAuthMenu';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>LOGO</div>
      <div className={styles.rightSection}>
        <div className={styles.loginForm}>
          <p>완벽한 발표를 위한 최고의 선택</p>
          <p>(서비스 이름)에서 발표 연습을 해보세요</p>

          <LoginForm />
          <LoginMenus />
          <div className={styles.text}>
            <span>또는</span>
          </div>
          <OAuthMenu />
        </div>
      </div>
    </div>
  );
};

export default Login;
