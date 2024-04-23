import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import HistoryBanner from './_components/HistoryBanner';
import styles from './page.module.scss';
import { serverHomeApi } from '@/services/server/home';
import GuideForNew from './_components/GuideForNew';
import CardList from '../_components/CardList';

export default async function Page() {
  const queryClient = new QueryClient();
  const listResponse = await queryClient.fetchInfiniteQuery({
    queryKey: ['home', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await serverHomeApi.getPresentationList({ pageParam });
      return await response.json();
    },
    initialPageParam: 0,
  });

  const isEmpty = listResponse.pages[0].page.empty;

  const latestResponse = await queryClient.fetchQuery({
    queryKey: ['home', 'latest'],
    queryFn: async () => {
      const latestResponse = await serverHomeApi.getLatestPresentation();
      if (latestResponse.status === 204) return 'empty';
      return await latestResponse.json();
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      {isEmpty ? (
        <GuideForNew />
      ) : (
        <div className={styles.container}>
          <HydrationBoundary state={dehydratedState}>
            {latestResponse !== 'empty' && <HistoryBanner presentation={latestResponse} />}
            {/* <ExerciseList /> */}
            <CardList usage="home" />
          </HydrationBoundary>
        </div>
      )}
    </>
  );
}
