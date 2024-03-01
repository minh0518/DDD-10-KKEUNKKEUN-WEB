import Modal from '@/app/_components/_modules/_modal/Modal';
import { ToggleType } from '@/app/_hooks/useToggle';
import classNames from 'classnames/bind';
import styles from './NextSlideConfirm.module.scss';
import Checkbox from '@/app/_components/_elements/Checkbox';
import { useState } from 'react';

interface Props {
  /** 컨텍스트 */
  context: ToggleType;
  /** 다음 페이지 이동 함수 */
  handleOkay: (checked: boolean) => void;
}

const NextSlideConfirm = ({ context, handleOkay }: Props) => {
  const [isChecked, setIsChecked] = useState(true);

  const cx = classNames.bind(styles);

  const onClickOkay = () => {
    handleOkay(isChecked);
  };

  const onClickCancel = () => {
    context.onClose();
  };

  const onChangeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Modal context={context} hasCloseBtn={false}>
      <div className={styles.container}>
        <h1 className={styles.title}>다음 슬라이드로 이동하시겠어요?</h1>
        <p className={styles.messgae}>
          처음부터 끝까지 발표문을 연습할 수 있도록
          <br />
          슬라이드는 앞으로만 이동할 수 있어요.
        </p>
        <div className={styles.action__box}>
          <button className={cx('action', 'action--okay')} onClick={onClickOkay}>
            이동하기
          </button>
          <button className={cx('action', 'action--cancel')} onClick={onClickCancel}>
            취소
          </button>
        </div>
        <div className={styles.checkbox}>
          <Checkbox _label="다시 보지 않기" checked={isChecked} onChange={onChangeCheckbox} />
        </div>
      </div>
    </Modal>
  );
};

export default NextSlideConfirm;
