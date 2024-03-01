import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ExerciseList from './_components/ExerciseList';
import HistoryBanner from './_components/HistoryBanner';
import styles from './page.module.scss';
import { serverHomeApi } from '@/services/server/home';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.fetchInfiniteQuery({
    queryKey: ['home', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await serverHomeApi.getPresentationList({ pageParam });
      return await response.json();
    },
    initialPageParam: 0,
  });

  const response = await queryClient.fetchQuery({
    queryKey: ['home', 'latest'],
    queryFn: async () => {
      const response = await serverHomeApi.getLatestPresentation();
      if (response.status === 204) return 'empty';
      return await response.json();
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        {response !== 'empty' && <HistoryBanner presentation={response} />}
        <ExerciseList />
      </HydrationBoundary>
    </div>
  );
}
