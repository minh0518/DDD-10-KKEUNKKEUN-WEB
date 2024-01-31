import { ChangeEvent, useEffect, useState } from 'react';
import { RadioProps } from '@/types/element';
import _isEqual from 'lodash-es/isEqual';

const Radio = ({ _label, _selectedValue, _onChangeSelected, ...rest }: RadioProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checked = _isEqual(rest.value, _selectedValue) || true === rest.checked;
    setIsChecked(checked);
  }, [rest.value, rest.checked, _selectedValue]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!rest.value) return;

    _onChangeSelected(rest.value);
  };

  return (
    <label>
      <input type="radio" checked={isChecked} onChange={handleOnChange} {...rest} />
      <span>{_label}</span>
    </label>
  );
};

export default Radio;
