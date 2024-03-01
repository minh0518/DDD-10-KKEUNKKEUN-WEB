import styles from './GuideContent.module.scss';

import classNames from 'classnames/bind';
import OneIcon from './_svgs/OneIcon';
import TwoIcon from './_svgs/TwoIcon';
import ThreeIcon from './_svgs/ThreeIcon';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);
const GuideContent = () => {
  const router = useRouter();
  return (
    <>
      <h1>프리젠이 처음이신가요?</h1>
      <p className={cx(['description__first'])}>
        성공적인 발표를 위해서 발표 연습은 매우 중요해요. 하지만 한번의 연습으로는 모든 내용을
        암기하기 힘들어요.
      </p>
      <p className={cx(['description__second'])}>
        앞으로의 성공적인 발표를 위해 지금 당장 연습하러 가볼까요?.
      </p>
      <div className={cx(['box'])}>
        <div className={cx(['left'])}></div>
        <div className={cx(['right'])}>
          <p>프리젠을 다음과 같이 이용해봐요!</p>
          <ul>
            <li>
              <OneIcon />
              <p>
                발표 PPT와 대본을 불러와 <span>발표 목록에 추가</span>해주세요
              </p>
            </li>
            <li>
              <TwoIcon />
              <p>
                연습하고 싶은 모드를 설정하여 <span>발표 연습</span>을 진행해주세요
              </p>
            </li>
            <li>
              <ThreeIcon />
              <p>
                <span>AI 피드백</span>을 받고 만점을 받을 때까지 연습을 해봐요!
              </p>
            </li>
          </ul>
        </div>
      </div>
      <button className={cx(['startButton'])} onClick={() => router.push('/upload/new')}>
        시작하기
      </button>
    </>
  );
};

export default GuideContent;
