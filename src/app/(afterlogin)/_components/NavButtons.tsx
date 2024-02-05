'use client';

import { MouseEventHandler, useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';

type ClickedList = 'presentationList' | 'report';

const isClickedList = (name: string): name is ClickedList => {
  return name === 'presentationList' || name === 'report';
};

const NavButtons = () => {
  const [clicked, setClicked] = useState<ClickedList>('presentationList');

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget;

    if (isClickedList(name)) setClicked(name);
  };

  return (
    <>
      <button
        className={classNames([clicked === 'presentationList' && styles.clicked])}
        name="presentationList"
        onClick={onClick}
      >
        발표 목록
      </button>
      <button
        className={classNames([clicked === 'report' && styles.clicked])}
        name="report"
        onClick={onClick}
      >
        리포트
      </button>
    </>
  );
};

export default NavButtons;
