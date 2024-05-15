import SocialLoginButtons from './_components/SocialLoginButtons';

import styles from './page.module.scss';

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <svg
          width="50"
          height="54"
          viewBox="0 0 50 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2164_8858)">
            <path
              d="M23.9922 50.9421L18.1067 48.515C16.8779 48.008 15.8828 46.6735 15.8828 45.5328V6.44814C15.8828 5.30741 16.8794 4.7946 18.1067 5.30013L23.9922 7.72726C25.2211 8.23425 26.2162 9.56873 26.2162 10.7095V49.7941C26.2162 50.9348 25.2196 51.4477 23.9922 50.9421Z"
              fill="#1E1E1E"
            />
            <path
              d="M8.10942 37.8725L2.22393 35.4454C0.995041 34.9384 0 33.6039 0 32.4632V15.4296C0 14.2889 0.99661 13.776 2.22393 14.2816L8.10942 16.7087C9.33831 17.2157 10.3334 18.5502 10.3334 19.6909V36.7245C10.3334 37.8652 9.33674 38.3781 8.10942 37.8725Z"
              fill="#1E1E1E"
            />
            <path
              d="M31.7578 0V9.93142C35.931 9.93142 39.3148 13.0768 39.3148 16.9564C39.3148 20.836 35.931 23.9814 31.7578 23.9814V33.9128C41.8322 33.9128 49.9981 26.3211 49.9981 16.9564C49.9981 7.5917 41.8322 0 31.7578 0Z"
              fill="#1E1E1E"
            />
            <path
              d="M45.8232 53.9985C48.1289 53.9985 49.998 52.2635 49.998 50.1233C49.998 47.9831 48.1289 46.248 45.8232 46.248C43.5175 46.248 41.6484 47.9831 41.6484 50.1233C41.6484 52.2635 43.5175 53.9985 45.8232 53.9985Z"
              fill="#6822FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_2164_8858">
              <rect width="50" height="54" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className={styles.description}>
          <p>완벽한 발표를 위한 최고의 선택</p>
          <p>프리젠에서 발표 연습을 해보세요.</p>
        </div>
        <div className={styles.socialButtons}>
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
};

export default page;
