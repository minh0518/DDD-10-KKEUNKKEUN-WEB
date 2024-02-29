import FlyoutMenu from '@/app/_components/_modules/FlyoutMenu';
import styles from './ExerciseItem.module.scss';
import ExerciseInfo from './_elements/ExerciseInfo';
import MenuIcon from './_svgs/MenuIcon';
import ModifyIcon from './_svgs/ModifyIcon';
import DeleteIcon from './_svgs/DeleteIcon';
import useToggle from '@/app/_hooks/useToggle';
import Confirm from '@/app/_components/_modules/_modal/Confirm';

interface Props {
  id: number;
}

const ExerciseItem = ({ id }: Props) => {
  const flyout = useToggle();
  const modal = useToggle();

  const handleModify = () => {
    // TODO: 발표 수정 페이지로 이동
    console.log('modify');
    flyout.onClose();
  };

  const handleDelete = () => {
    flyout.onClose();
    modal.onOpen();
  };

  const deleteItem = (id: number) => {
    // TODO: 실제 API 연동 필요한 부분
    console.log('delete: ', id);
  };

  return (
    <>
      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.menu__box}>
            <FlyoutMenu context={flyout}>
              <FlyoutMenu.ToggleButton>
                <MenuIcon />
              </FlyoutMenu.ToggleButton>
              <FlyoutMenu.MenuList>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleModify}>
                    <ModifyIcon />
                    <span>수정</span>
                  </button>
                </FlyoutMenu.MenuItem>
                <FlyoutMenu.MenuItem>
                  <button className={styles.menu} onClick={handleDelete}>
                    <DeleteIcon />
                    <span>삭제</span>
                  </button>
                </FlyoutMenu.MenuItem>
              </FlyoutMenu.MenuList>
            </FlyoutMenu>
          </div>
        </div>
        <div className={styles.info__box}>
          <div className={styles.info}>
            <ExerciseInfo />
          </div>
          <div className={styles.action__box}>
            <button className={styles.action}>연습하기</button>
          </div>
        </div>
      </article>

      <Confirm
        context={modal}
        title="발표 연습 파일을 삭제하시겠어요?"
        message="삭제한 파일은 복원할 수 없습니다."
        okayText="삭제하기"
        cancelText="취소"
        onOkayClick={() => {
          deleteItem(id);
        }}
      />
    </>
  );
};

export default ExerciseItem;
