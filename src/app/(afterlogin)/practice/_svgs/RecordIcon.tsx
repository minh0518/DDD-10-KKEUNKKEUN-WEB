interface Props {
  /** 녹음 진행 여부 */
  isRecording: boolean;
}

const RecordIcon = ({ isRecording }: Props) => {
  return isRecording ? RecordOnIcon() : RecordOffIcon();
};

const RecordOnIcon = () => {
  return (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.2" />
        <path
          d="M22.7096 8.98547C20.9231 8.61943 19.081 8.61943 17.2946 8.98547C16.7398 9.09914 16.3126 9.54322 16.2205 10.102L16.1528 10.5132C15.5949 13.898 15.5949 17.3513 16.1528 20.7362L16.2205 21.1474C16.3126 21.7062 16.7398 22.1502 17.2946 22.2639C19.081 22.6299 20.9231 22.6299 22.7096 22.2639C23.2644 22.1502 23.6915 21.7062 23.7836 21.1474L23.8514 20.7362C24.4092 17.3513 24.4092 13.898 23.8514 10.5132L23.7836 10.102C23.6915 9.54322 23.2644 9.09914 22.7096 8.98547Z"
          fill="white"
        />
        <path
          d="M11.1186 17.8219C11.6312 17.7493 12.1057 18.106 12.1783 18.6186L12.7415 22.5928C12.8936 23.6665 13.7448 24.506 14.8205 24.6434C18.2597 25.0828 21.7407 25.0828 25.1798 24.6434C26.2554 24.506 27.1067 23.6665 27.2588 22.5928L27.8219 18.6186C27.8945 18.106 28.369 17.7493 28.8817 17.8219C29.3943 17.8945 29.751 18.369 29.6784 18.8816L29.1152 22.8558C28.8445 24.7656 27.3307 26.2589 25.4173 26.5033C23.9295 26.6934 22.4343 26.8048 20.9377 26.8376V31.8751C20.9377 32.3929 20.5179 32.8126 20.0002 32.8126C19.4824 32.8126 19.0627 32.3929 19.0627 31.8751V26.8376C17.566 26.8048 16.0707 26.6934 14.5829 26.5033C12.6696 26.2589 11.1557 24.7656 10.885 22.8558L10.3219 18.8816C10.2493 18.369 10.6059 17.8945 11.1186 17.8219Z"
          fill="white"
        />
        <path d="M15 33H25" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </i>
  );
};

const RecordOffIcon = () => {
  return (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <g clipPath="url(#clip0_3744_9405)">
          <g opacity="0.2">
            <path
              d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z"
              fill="white"
            />
          </g>
          <path
            d="M30.116 11L11 29.144"
            stroke="white"
            strokeWidth="2.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M23.6062 13.1111C23.6062 10.9512 21.9945 9.2002 20.0062 9.2002C18.018 9.2002 16.4062 10.9512 16.4062 13.1111V19.6893C16.4062 21.8492 18.018 23.6002 20.0062 23.6002C21.9945 23.6002 23.6062 21.8492 23.6062 19.6893V13.1111Z"
            fill="white"
          />
          <path
            d="M27.2125 20C27.2125 23.7057 23.993 26.7029 20.0125 26.7029C16.032 26.7029 12.8125 23.7057 12.8125 20"
            stroke="white"
            strokeWidth="2.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M15.7812 30.7998H20.0154"
            stroke="white"
            strokeWidth="2.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M20.0156 27.1235V30.7997H24.2498"
            stroke="white"
            strokeWidth="2.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3744_9405">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </i>
  );
};

export default RecordIcon;
