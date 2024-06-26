import { ButtonProps } from '@/types/element';

const Button = ({ _className, _content, ...rest }: ButtonProps) => {
  return (
    <button className={_className} {...rest}>
      {_content}
    </button>
  );
};

export default Button;
