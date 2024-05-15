import { CheckboxProps } from '@/types/element';
import styles from './Checkbox.module.scss';
import classNames from 'classnames/bind';

const Checkbox = ({ _label, ...rest }: CheckboxProps) => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('input-box')}>
      <input type="checkbox" id={rest.id ?? 'input'} {...rest} />
      <label htmlFor={rest.id ?? 'input'}>{_label}</label>
    </div>
  );
};

export default Checkbox;
