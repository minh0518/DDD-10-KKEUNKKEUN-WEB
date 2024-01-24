import { CheckboxProp } from '@/types/element';

const Checkbox = ({ _label, _isChecked, _onChange, ...rest }: CheckboxProp) => {
  return (
    <label htmlFor="checkbox">
      <input id="checkbox" type="checkbox" checked={_isChecked} onChange={_onChange} {...rest} />
      {_label}
    </label>
  );
};

export default Checkbox;
