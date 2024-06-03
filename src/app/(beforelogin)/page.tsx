import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';
import { CDN_BASE_URL } from '@/config/path';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSectionWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.smallDescription}>
            <p>Make perfect presentation</p>
          </div>
          <div className={styles.mainTitle}>
            <p>Ai와 함께하는 발표 연습,</p>
            <p>프리젠으로 효과적으로 전하세요</p>
          </div>
          <div className={styles.subTitle}>
            <p>성공적인 발표는 완벽한 연습에서 비롯됩니다.</p>
            <p>효율적으로 발표 연습을 도와드릴게요!</p>
          </div>
          <Link className={styles.startButton} href={`/login`}>
            발표 시작하기
          </Link>
        </div>
      </div>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSection}>
          <Image
            src={`${CDN_BASE_URL}/data/etc/defaults/minho.gif`}
            width={837}
            height={760}
            alt="gif"
          />
        </div>
      </div>
    </div>
  );
}
