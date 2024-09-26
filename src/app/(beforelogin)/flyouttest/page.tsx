'use client';
import React from 'react';
import styles from './flyouttest.module.scss';
import Flyout from '@/app/_components/_modules/Flyout';
import MenuIcon from '@/app/(afterlogin)/(common_navbar)/home/_components/_svgs/MenuIcon';

const page = () => {
  return (
    <div>
      <h1>ㅎㅇ</h1>
      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.dummyImg} />
          <div className={styles.menu__box}>
            <Flyout toggleButton={<MenuIcon />}>
              <button>a</button>
              <button>b</button>
            </Flyout>
          </div>
        </div>
      </article>

      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.dummyImg} />
          <div className={styles.menu__box}>
            <Flyout toggleButton={<MenuIcon />}>
              <button>a</button>
              <button>b</button>
            </Flyout>
          </div>
        </div>
      </article>

      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.dummyImg} />
          <div className={styles.menu__box}>
            <Flyout toggleButton={<MenuIcon />}>
              <button>a</button>
              <button>b</button>
            </Flyout>
          </div>
        </div>
      </article>

      <article className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.dummyImg} />
          <div className={styles.menu__box}>
            <Flyout toggleButton={<MenuIcon />}>
              <button>a</button>
              <button>b</button>
            </Flyout>
          </div>
        </div>
      </article>
    </div>
  );
};

export default page;
