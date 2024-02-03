import { TextAreaProps } from '@/types/element';
import { forwardRef } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ _className, size, width, theme, value, warning, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cx(['textarea', `${size}`, `${width}`, `${theme}`, warning && 'warning'])}
        {...rest}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
