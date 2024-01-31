import { CheckboxProps } from '@/types/element';

const Checkbox = ({ _label, ...rest }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" {...rest} />
      {_label}
    </label>
  );
};

export default Checkbox;
