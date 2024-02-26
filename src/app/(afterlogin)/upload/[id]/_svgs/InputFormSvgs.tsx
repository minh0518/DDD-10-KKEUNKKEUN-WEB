import { ReactChildrenProps } from '@/types/common';
import styles from './InputFormSvgs.module.scss';

const InputFormSvgs = ({ children }: ReactChildrenProps) => {
  return <>{children}</>;
};

const MemoDescriptionHover = () => {
  return (
    <div className={styles.memoDescriptionHover}>
      <svg
        width="313"
        height="55"
        viewBox="0 0 313 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.613281" width="313" height="40" rx="5" fill="#868686" />
        <text x="158" y="27" fill="white" className={styles.descriptionText}>
          발표 연습중에도 메모를 남길 수 있어요.
        </text>
        <path
          d="M159.591 53.3134C158.434 55.2979 155.566 55.2979 154.409 53.3134L147 40.6128L167 40.6128L159.591 53.3134Z"
          fill="#868686"
        />
      </svg>
    </div>
  );
};

const TimerDescriptionHover = () => {
  return (
    <div className={styles.timerDescriptionHover}>
      <svg
        width="380"
        height="55"
        viewBox="0 0 380 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="380" height="40" rx="5" fill="#868686" />
        <text x="190" y="27" fill="white" className={styles.descriptionText}>
          발표 종료가 얼마 남지 않았을 때 알림을 받을 수 있어요.
        </text>
        <path
          d="M192.591 52.7001C191.434 54.6846 188.566 54.6846 187.409 52.7001L180 39.9995L200 39.9995L192.591 52.7001Z"
          fill="#868686"
        />
      </svg>
    </div>
  );
};

const HoverLogo = () => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8.0026" cy="8.88639" r="6.66667" fill="#9C9C9C" />
      <path
        d="M8.51782 5.14941L8.44946 10.2275H7.62914L7.56078 5.14941H8.51782ZM8.0393 12.2783C7.6975 12.2783 7.40453 11.9951 7.4143 11.6436C7.40453 11.3018 7.6975 11.0186 8.0393 11.0186C8.3811 11.0186 8.6643 11.3018 8.6643 11.6436C8.6643 11.9951 8.3811 12.2783 8.0393 12.2783Z"
        fill="white"
      />
    </svg>
  );
};

const MemoDescription = () => {
  return (
    <div className={styles.memoDescriptionContainer}>
      <MemoDescriptionHover />
      <HoverLogo />
    </div>
  );
};

const DeadlineDateDescription = () => {
  return (
    <div className={styles.timerDescriptionContainer}>
      <TimerDescriptionHover />
      <HoverLogo />
    </div>
  );
};

InputFormSvgs.MemoDescription = MemoDescription;
InputFormSvgs.DeadlineDateDescription = DeadlineDateDescription;
export default InputFormSvgs;
