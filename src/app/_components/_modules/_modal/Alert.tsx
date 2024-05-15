import styles from './Alert.module.scss';
import { ToggleType } from '@/app/_hooks/useToggle';
import { ToggleContext } from '@/app/_hooks/useToggleContext';
import ModalLayout from './ModalLayout';

interface Props {
  /** 컨텍스트 */
  context: ToggleType;
  /** 제목 */
  title: string;
  /** 본문 */
  message: string;
  /** 하단 버튼 텍스트 */
  actionText?: string;
  /** 하단 버튼 비활성화 여부 (true: 비활성화, false: 활성화 / 기본값: true) */
  isDisabled?: boolean;
  /** 하단 버튼 이벤트 (기본 값 : 창 닫음) */
  onActionClick?: () => void;
}

const Alert = ({
  context,
  title,
  message,
  actionText = '확인',
  isDisabled = false,
  onActionClick,
}: Props) => {
  const handleOnClick = () => {
    if (typeof onActionClick === 'function') {
      onActionClick();
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
          <button className={styles.action} disabled={isDisabled} onClick={handleOnClick}>
            {actionText}
          </button>
        </div>
      </ModalLayout>
    </ToggleContext.Provider>
  );
};

export default Alert;
