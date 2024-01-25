import { ToggleButtonProps } from '@/types/element';
import { combineClassName } from '@/app/_utils/style';
import styles from './ToggleButton.module.scss';

const ToggleButton = ({
  _label,
  _isChecked,
  _activedLabel,
  _onChange,
  ...rest
}: ToggleButtonProps) => {
  return (
    <>
      {_activedLabel ? (
        <>
          <label className={combineClassName([styles.container, styles.actived__label])}>
            <input
              className={styles.input}
              role="switch"
              type="checkbox"
              checked={_isChecked}
              onChange={_onChange}
              {...rest}
            />
            {_label}
          </label>
        </>
      ) : (
        <div className={styles.container}>
          <input
            className={styles.input}
            role="switch"
            type="checkbox"
            checked={_isChecked}
            onChange={_onChange}
            {...rest}
          />
          <label>{_label}</label>
        </div>
      )}
    </>
  );
};

export default ToggleButton;
