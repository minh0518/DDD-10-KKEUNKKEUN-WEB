import { userApi } from '@/services/user';
import { PresentInfoType } from '@/types/service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPresentationData = (slug: string) => {
  const { data: value } = useSuspenseQuery({
    queryKey: ['presentation', 'upload', slug],
    queryFn: async () => {
      const res = await userApi.getPresentData<PresentInfoType>(slug);
      return res;
    },
  });
  return value;
};
