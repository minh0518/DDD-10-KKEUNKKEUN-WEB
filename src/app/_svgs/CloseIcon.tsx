interface Props {
  color?: 'black' | 'white';
}

const CloseIcon = ({ color = 'black' }: Props) => {
  const isBlack = color === 'black';

  return isBlack ? CloseIconBlack() : CloseIconWhite();
};

const CloseIconBlack = () => {
  return (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clipPath="url(#clip0_3328_2165)">
          <path
            d="M13.0895 11.9975L21.7751 3.31401C22.075 3.01424 22.075 2.52461 21.7751 2.22483C21.4753 1.92506 20.9855 1.92506 20.6857 2.22483L12 10.9083L3.31434 2.22483C3.01449 1.92506 2.52474 1.92506 2.22489 2.22483C1.92504 2.52461 1.92504 3.01424 2.22489 3.31401L10.9105 11.9975L2.22489 20.681C1.92504 20.9808 1.92504 21.4704 2.22489 21.7702C2.37481 21.92 2.57471 22 2.76462 22C2.95452 22 3.15442 21.92 3.30435 21.7702L11.99 13.0867L20.6757 21.7702C20.8256 21.92 21.0255 22 21.2154 22C21.4053 22 21.6052 21.92 21.7551 21.7702C22.055 21.4704 22.055 20.9808 21.7551 20.681L13.0695 11.9975H13.0895Z"
            fill="#1E1E1E"
          />
        </g>
        <defs>
          <clipPath id="clip0_3328_2165">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </i>
  );
};

const CloseIconWhite = () => {
  return (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M17.1693 2.4785L15.5243 0.833496L9.0026 7.35516L2.48094 0.833496L0.835938 2.4785L7.3576 9.00016L0.835938 15.5218L2.48094 17.1668L9.0026 10.6452L15.5243 17.1668L17.1693 15.5218L10.6476 9.00016L17.1693 2.4785Z"
          fill="white"
        />
      </svg>
    </i>
  );
};

export default CloseIcon;
