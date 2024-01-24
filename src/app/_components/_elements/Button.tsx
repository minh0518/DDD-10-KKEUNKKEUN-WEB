import { ButtonProp } from '@/types/element';

const Button = ({ _className, _content, ...rest }: ButtonProp) => {
  return (
    <button className={_className} {...rest}>
      {_content}
    </button>
  );
};

export default Button;
