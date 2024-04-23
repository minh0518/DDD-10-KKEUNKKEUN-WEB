import LogoIcon from '@/app/_svgs/LogoIcon';
import styles from './SettingNav.module.scss';
import CloseIcon from '@/app/_svgs/CloseIcon';
import classNames from 'classnames';
import CancelButton from './CancelButton';
import { UploadDataType } from '@/types/service';
import { serverPptApi } from '@/services/server/upload';

interface Props {
  id: number;
}

const SettingNav = async ({ id }: Props) => {
  const data = await serverPptApi.getPresentationData(id);
  const pptResult = (await data.json()) as UploadDataType;
  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <LogoIcon />
          <button
            className={classNames([styles.presentationList, styles.clicked])}
            name="presentationList"
          >
            {pptResult.title}
          </button>
        </div>

        <div className={styles.right}>
          <CancelButton>
            <CloseIcon color="white" />
          </CancelButton>
        </div>
      </div>
    </nav>
  );
};

export default SettingNav;
