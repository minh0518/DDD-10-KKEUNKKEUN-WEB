import { Suspense } from 'react';
import CreatePresentation from './_component/CreatePresentation';
import EditPresentation from './_component/EditPresentation';
import Spinner from '@/app/_components/_modules/Spinner';

interface PageProps {
  params: { id: string };
}
const page = ({ params }: PageProps) => {
  const slug = params.id;

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {slug === 'new' ? <CreatePresentation /> : <EditPresentation slug={Number(slug)} />}
      </Suspense>
    </div>
  );
};

export default page;
