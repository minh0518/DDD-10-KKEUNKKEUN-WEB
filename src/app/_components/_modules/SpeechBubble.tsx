import classNames from 'classnames/bind';
import styles from './SpeechBubble.module.scss';
import CloseIcon from '@/app/_svgs/CloseIcon';
import { ToggleContext } from '@/app/_hooks/useToggleContext';
import { ToggleType } from '@/app/_hooks/useToggle';

interface Props {
  /** 컨텍스트 */
  context: ToggleType;
  /** 말풍선 문구 */
  message: string;
  /** 말풍선 방향 (기본값: up) */
  direction?: 'up' | 'down';
  /** X 버튼 유무 (기본값: false) */
  hasCloseBtn?: boolean;
}

const SpeechBubble = ({ context, message, direction = 'up', hasCloseBtn = false }: Props) => {
  const cx = classNames.bind(styles);

  const handleClose = () => {
    if (hasCloseBtn) {
      context.onClose();
    }
  };

  if (!context.isOpen) return null;

  return (
    <ToggleContext.Provider value={context}>
      <div className={cx('speech-bubble', direction, hasCloseBtn && 'has-close')}>
        {message}
        {hasCloseBtn && (
          <button className={cx('close')} onClick={handleClose}>
            <CloseIcon />
          </button>
        )}
      </div>
    </ToggleContext.Provider>
  );
};

export default SpeechBubble;
