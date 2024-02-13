import { ReactChildrenProps } from '@/types/common';

const PptImageSvgs = ({ children }: ReactChildrenProps) => {
  return <>{children}</>;
};
const GoLeft = () => {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.034 2.07689L11.1162 0.169922L0.460938 10.836L11.127 21.5021L13.034 19.5951L4.27487 10.836L13.034 2.07689Z"
        fill="#4B4B4B"
      />
    </svg>
  );
};

const GoRight = () => {
  return (
    <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.382812 19.5951L2.28978 21.5021L12.9558 10.836L2.28978 0.169922L0.382812 2.07689L9.14192 10.836L0.382812 19.5951Z"
        fill="#1E1E1E"
      />
    </svg>
  );
};

const X = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="#1E1E1E"
        fill-opacity="0.5"
      />
    </svg>
  );
};

const NewPpt = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 4H21V15H18V7H7V4ZM6 7V3H22V16H18V20H2V7H6ZM17 16V19H3V8H6V16H17ZM17 15H7V8H17V15Z"
        fill="black"
      />
    </svg>
  );
};

const AddNewPpt = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.32812 11.9998L10.6293 15.3332L16.6615 8.6665" stroke="white" stroke-width="2" />
      <circle cx="12" cy="12" r="10" fill="#BCBCBC" />
      <rect x="11.0938" y="8.36377" width="1.51515" height="6.9697" rx="0.757576" fill="#878787" />
      <rect
        x="15.3359"
        y="11.0908"
        width="1.51515"
        height="6.9697"
        rx="0.757576"
        transform="rotate(90 15.3359 11.0908)"
        fill="#878787"
      />
    </svg>
  );
};

PptImageSvgs.GoLeft = GoLeft;
PptImageSvgs.GoRight = GoRight;
PptImageSvgs.X = X;
PptImageSvgs.NewPpt = NewPpt;
PptImageSvgs.AddNewPpt = AddNewPpt;

export default PptImageSvgs;
