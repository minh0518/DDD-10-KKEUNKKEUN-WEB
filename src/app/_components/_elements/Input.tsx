import React, { forwardRef } from 'react';
import { InputInfoType } from '@/types/element';

const Input = forwardRef<HTMLInputElement, InputInfoType>(({ _className, ...rest }, ref) => {
  return <input ref={ref} className={_className} {...rest} />;
});

Input.displayName = 'Input';

export default Input;
