import React, { forwardRef } from 'react';
import { InputProps } from '@/types/element';

const Input = forwardRef<HTMLInputElement, InputProps>(({ _className, ...rest }, ref) => {
  return <input ref={ref} className={_className} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
