import SettingProcess from './_components/SettingProcess';
import styles from './page.module.scss';
import { serverSettingApi } from '@/services/server/setting';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

interface PageProps {
  params: { id: string };
}
const page = async ({ params }: PageProps) => {
  const slug = Number(params.id);

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  await queryClient.fetchQuery({
    queryKey: ['setting', slug],
    queryFn: async () => {
      const response = await serverSettingApi.getPresentationSettingData(slug);
      return await response.json();
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <SettingProcess />
      </HydrationBoundary>
    </div>
  );
};

export default page;
