import { ButtonInfoType } from '@/types/common';

const Button = ({
  _className,
  _disabled = false,
  _type = 'button',
  content,
  _onClick,
}: ButtonInfoType) => {
  return (
    <button className={_className} disabled={_disabled} type={_type} onClick={_onClick}>
      {content}
    </button>
  );
};

export default Button;
