import styles from './Confirm.module.scss';
import { ToggleType } from '@/app/_hooks/useToggle';
import { ToggleContext } from '@/app/_hooks/useToggleContext';
import ModalLayout from './ModalLayout';
import classNames from 'classnames/bind';

interface Props {
  /** 컨텍스트 */
  context: ToggleType;
  /** 제목 */
  title: string;
  /** 본문 */
  message: string;
  /** 왼쪽 확인 버튼 텍스트 */
  okayText: string;
  /** 오른쪽 취소 버튼 텍스트 */
  cancelText: string;
  /** 왼쪽 확인 버튼 이벤트 (필수) */
  onOkayClick: () => void;
  /** 오른쪽 취소 버튼 이벤트 (기본 값 : 창 닫음) */
  onCancelClick?: () => void;
}

const Confirm = ({
  context,
  title,
  message,
  okayText,
  cancelText,
  onOkayClick,
  onCancelClick,
}: Props) => {
  const cx = classNames.bind(styles);

  const handleOkay = () => {
    onOkayClick();
    context.onClose();
  };

  const handleCancel = () => {
    if (typeof onCancelClick === 'function') {
      onCancelClick();
    } else {
      context.onClose();
    }
  };
  return (
    <ToggleContext.Provider value={context}>
      <ModalLayout hasClosedDim={false}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.messgae}>{message}</p>
          <div className={styles.action__box}>
            <button className={cx('action', 'action--okay')} onClick={handleOkay}>
              {okayText}
            </button>
            <button className={cx('action', 'action--cancel')} onClick={handleCancel}>
              {cancelText}
            </button>
          </div>
        </div>
      </ModalLayout>
    </ToggleContext.Provider>
  );
};

export default Confirm;
