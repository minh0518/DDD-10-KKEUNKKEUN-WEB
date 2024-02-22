'use client';

import styles from './StepsDescription.module.scss';

interface StepsDescriptionProps {
  current: number;
}
const StepsDescription = ({ current }: StepsDescriptionProps) => {
  const first = (
    <>
      <h1>어떤 모드로 연습을 하시겠어요?</h1>
      <h4>발표문 암기 정도에 따라 선택 해 주세요</h4>
    </>
  );
  const second = (
    <>
      <h1>외울 문장을 드래그해서 강조해 주세요.</h1>
      <h4>발표 연습을 할 때, 강조한 문장은 보이지 않아요.</h4>
    </>
  );

  const third = (
    <>
      <h1>사용할 디바이스를 선택 해 주세요.</h1>
      <h4>리허설처럼 연습하려면 `데스크탑과 모바일`을 추천드려요.</h4>
    </>
  );

  return (
    <div className={styles.container}>
      {current === 0 && first}
      {current === 1 && second}
      {current === 2 && third}
    </div>
  );
};

export default StepsDescription;
