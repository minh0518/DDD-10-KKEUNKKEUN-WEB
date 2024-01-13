import { ReactChildrenProps } from '@/types/common';

import styles from './layout.module.scss';

export default function BeforeLoginLayout({ children }: ReactChildrenProps) {
  return <div className={styles.container}>{children}</div>;
}
