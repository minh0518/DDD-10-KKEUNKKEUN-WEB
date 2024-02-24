import useToggleContext from '@/app/_hooks/useToggleContext';
import styles from './ModalLayout.module.scss';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  /** dimmed 영역을 눌러서 닫기 여부 (기본값 : true) */
  hasClosedDim?: boolean;
  /** 자식 노드 */
  children: ReactNode;
}

const ModalLayout = ({ hasClosedDim = true, children }: Props) => {
  const context = useToggleContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /** INFO: dimmed 영역을 눌러서 닫기를 원하는 경우만 이벤트 동작 */
    if (hasClosedDim) {
      /** 모달 닫는 함수 선언 */
      const closeModal = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node | null)) {
          context.onClose();
        }
      };

      /** 이벤트 등록 */
      window.addEventListener('mousedown', closeModal);
      return () => {
        window.addEventListener('mousedown', closeModal);
      };
    }
  }, [context]);

  if (!context.isOpen) return null;

  return (
    <div className={styles.dimmed}>
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
