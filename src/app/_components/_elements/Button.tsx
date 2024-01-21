import { ButtonInfoType } from '@/types/element';

const Button = ({ _className, _content, ...rest }: ButtonInfoType) => {
  return (
    <button className={_className} {...rest}>
      {_content}
    </button>
  );
};

export default Button;
