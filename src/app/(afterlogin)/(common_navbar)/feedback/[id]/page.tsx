import { fetch_ServerAuth } from '@/services/server/fetchServer';
import CategoryFeedback from './_components/CategoryFeedback';
import MemorizeReview from './_components/MemorizeReview';
import TotalScore from './_components/TotalScore';
import styles from './page.module.scss';
import { serverFeedbackApi } from '@/services/server/feedback';

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params }: Props) => {
  const id = Number(params.id);
  const res = await serverFeedbackApi.getFeedbackInfo(id);
  console.log(await res.json());

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TotalScore />
        <CategoryFeedback />
        <MemorizeReview />
      </div>
    </div>
  );
};

export default page;
