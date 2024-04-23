'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import ExerciseItem from './ExerciseItem';
import styles from './ExerciseList.module.scss';
import PlusIcon from './_svgs/PlusIcon';
import { clientHomeApi } from '@/services/client/home';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import { PresentationListType } from '@/types/service';
import { useRouter } from 'next/navigation';

const ExerciseList = () => {
  const router = useRouter();

  // const { data: latestData }: { data: LatestPresentationType | string | undefined } =
  //   useGetLatestPresentation();

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['home', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await clientHomeApi.getPresentationList({ pageParam });
      return await response.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage && pages) {
        const currentPage = pages?.length; // 현재 pageParam
        const totalPages = lastPage?.page?.totalPage; // 전체 페이지 수

        if (currentPage < totalPages) {
          return currentPage;
        } else {
          return undefined;
        }
      }
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <section className={styles.container}>
      <h2>내 발표연습 목록</h2>

      <ul className={styles.exercise__box}>
        {data?.pages.map((eachPage: PresentationListType, index) => {
          return (
            <Fragment key={index}>
              {eachPage.page.content.map((presentation, index) => (
                <li className={styles.exercise} key={index}>
                  <ExerciseItem presentation={presentation} />
                </li>
              ))}
            </Fragment>
          );
        })}
        <button
          className={styles.exercise__new}
          onClick={() => {
            router.push(`/upload/new`);
          }}
        >
          <PlusIcon />
          <span>새 발표 추가하기</span>
        </button>
      </ul>

      <div ref={ref} style={{ height: '30px' }} />
    </section>
  );
};

export default ExerciseList;
