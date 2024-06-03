'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './CardList.module.scss';
import { clientHomeApi } from '@/services/client/home';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';
import { CardListType, FeedbackListType, PresentationListType } from '@/types/service';
import { usePathname, useRouter } from 'next/navigation';
import PlusIcon from '../home/_components/_svgs/PlusIcon';
import CardItem from './CardItem';
import { clientFeedbackApi } from '@/services/client/feedback';

const CardList = () => {
  // 피드백의 경우, 완료가 안 된게 있으면 1초마다 fetch
  const router = useRouter();
  const pathname = usePathname();
  const usage: 'feedback' | 'home' = pathname === `/feedback/list` ? 'feedback' : 'home';
  console.log(`pathname : ${pathname}`);
  console.log(`usage : ${usage}`);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: [usage, 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      if (usage === 'home') {
        const response = await clientHomeApi.getPresentationList({ pageParam });
        return await response.json();
      }
      if (usage === 'feedback') {
        const response = await clientFeedbackApi.getFeedbackList({ pageParam });
        return await response.json();
      }
    },
    staleTime: 0,
    gcTime: 0,
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
      <h2>내 {usage === 'home' ? '발표연습' : '피드백'} 목록</h2>

      <ul className={styles.exercise__box}>
        {data?.pages.map((eachPage: PresentationListType | FeedbackListType, index) => {
          return (
            <Fragment key={index}>
              {eachPage.page.content.map((listInfo: CardListType, index) => (
                <li className={styles.exercise} key={index}>
                  <CardItem listInfo={listInfo} />
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

export default CardList;
