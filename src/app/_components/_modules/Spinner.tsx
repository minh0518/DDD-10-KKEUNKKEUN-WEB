import styles from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={styles.container}>
      <svg className={styles.loader} height="100%" viewBox="0 0 32 32" width={65}>
        <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"></circle>
        <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4"></circle>
      </svg>
    </div>
  );
}
