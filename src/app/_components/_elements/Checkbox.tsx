import { CheckboxProps } from '@/types/element';

const Checkbox = ({ _label, _isChecked, ...rest }: CheckboxProps) => {
  return (
    <label htmlFor="checkbox">
      <input id="checkbox" type="checkbox" checked={_isChecked} {...rest} />
      {_label}
    </label>
  );
};

export default Checkbox;
