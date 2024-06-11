import { serverFeedbackApi } from '@/services/server/feedback';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react';
import styles from './page.module.scss';
import CardList from '../../_components/CardList';
import EmptyFeedback from '../../_components/_Feedback/EmptyFeedback';

export default async function Page() {
  const queryClient = new QueryClient();
  const listResponse = await queryClient.fetchInfiniteQuery({
    queryKey: ['feedback', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await serverFeedbackApi.getFeedbackList({ pageParam });
      return await response.json();
    },
    initialPageParam: 0,
  });

  const isEmpty = listResponse.pages[0].page.empty;

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      {isEmpty ? (
        <EmptyFeedback />
      ) : (
        <div className={styles.container}>
          <HydrationBoundary state={dehydratedState}>
            <CardList />
          </HydrationBoundary>
        </div>
      )}
    </>
  );
}
