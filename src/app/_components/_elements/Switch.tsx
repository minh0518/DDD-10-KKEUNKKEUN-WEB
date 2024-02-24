import { SwitchProps } from '@/types/element';
import { combineClassName } from '@/app/_utils/style';
import styles from './Switch.module.scss';

const Switch = ({ _label, _activedLabel, ...rest }: SwitchProps) => {
  return (
    <>
      {_activedLabel ? (
        <>
          <label className={combineClassName([styles.container, styles.actived__label])}>
            <input className={styles.input} role="switch" type="checkbox" {...rest} />
            {_label}
          </label>
        </>
      ) : (
        <div className={styles.container}>
          <input className={styles.input} role="switch" type="checkbox" {...rest} />
          <label>{_label}</label>
        </div>
      )}
    </>
  );
};

export default Switch;
