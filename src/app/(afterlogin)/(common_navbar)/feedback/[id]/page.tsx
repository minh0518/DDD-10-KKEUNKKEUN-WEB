import CategoryFeedback from './_components/CategoryFeedback';
import MemorizeReview from './_components/MemorizeReview';
import TotalScore from './_components/TotalScore';
import styles from './page.module.scss';
import { serverFeedbackApi } from '@/services/server/feedback';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { FeedbackInfoType } from '@/types/service';

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  const id = Number(params.id);

  const queryClient = new QueryClient();
  const feedbackData = await queryClient.fetchQuery({
    queryKey: ['feedback', 'info', id],
    queryFn: async () => {
      const response = await serverFeedbackApi.getFeedbackInfo(id);
      return (await response.json()) as FeedbackInfoType;
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TotalScore feedbackData={feedbackData} />
        <CategoryFeedback feedbackData={feedbackData} />
        <HydrationBoundary state={dehydratedState}>
          <MemorizeReview id={id} />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default page;
