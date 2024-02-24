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
  /** 하단 버튼 이벤트 (기본 값 : 창 닫음) */
  onActionClick?: () => void;
}

const Alert = ({ context, title, message, onActionClick }: Props) => {
  const handleOnClick = () => {
    if (typeof onActionClick === 'function') {
      console.log('here');
      onActionClick();
    } else {
      console.log('there???');
      context.onClose();
    }
  };
  return (
    <ToggleContext.Provider value={context}>
      <ModalLayout hasClosedDim={false}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.messgae}>{message}</p>
          <button className={styles.action} onClick={handleOnClick}>
            okay
          </button>
        </div>
      </ModalLayout>
    </ToggleContext.Provider>
  );
};

export default Alert;
