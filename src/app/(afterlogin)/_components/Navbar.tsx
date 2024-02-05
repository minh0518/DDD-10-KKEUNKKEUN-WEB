import NavButtons from './NavButtons';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="47.9002" height="48" rx="8" fill="#B6B6B6" />
          </svg>
          <NavButtons />
        </div>

        <div className={styles.right}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 24C29.525 24 34 19.525 34 14C34 8.475 29.525 4 24 4C18.475 4 14 8.475 14 14C14 19.525 18.475 24 24 24ZM24 29C17.325 29 4 32.35 4 39V44H44V39C44 32.35 30.675 29 24 29Z"
              fill="#BFBFBF"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
