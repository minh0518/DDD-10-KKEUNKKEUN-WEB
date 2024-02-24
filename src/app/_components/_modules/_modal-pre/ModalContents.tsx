import { useModalStore } from '@/store/modal';
import { ReactChildrenProps } from '@/types/common';
import styles from './ModalContents.module.scss';

const ModalContents = ({ children }: ReactChildrenProps) => {
  return <>{children}</>;
};

const ExitUpload = () => {
  return (
    <>
      <p className={styles.exitUpload_firstParagraph}>발표 자료 추가를 중단하시겠어요?</p>
      <p className={styles.exitUpload_secondParagraph}>임시저장하지 않은 자료는 복원할 수 없어요</p>
    </>
  );
};

const ExitUploadCancel = () => {
  const { closeModal } = useModalStore();

  const onClick = () => {
    closeModal();
  };
  return (
    <button className={styles.exitUpload_cancelButton} onClick={onClick}>
      계속 작성하기
    </button>
  );
};

const ExitUploadSubmit = () => {
  const { closeModal } = useModalStore();
  const onClick = () => {
    closeModal();
  };
  return (
    <button className={styles.exitUpload_submitButton} onClick={onClick}>
      중단하기
    </button>
  );
};

ModalContents.ExitUpload = ExitUpload;
ModalContents.ExitUploadCancel = ExitUploadCancel;
ModalContents.ExitUploadSubmit = ExitUploadSubmit;

export default ModalContents;
