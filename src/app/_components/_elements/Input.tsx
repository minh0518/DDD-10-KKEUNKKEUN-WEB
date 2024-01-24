import React, { forwardRef } from 'react';
import { InputProp } from '@/types/element';

const Input = forwardRef<HTMLInputElement, InputProp>(({ _className, ...rest }, ref) => {
  return <input ref={ref} className={_className} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
