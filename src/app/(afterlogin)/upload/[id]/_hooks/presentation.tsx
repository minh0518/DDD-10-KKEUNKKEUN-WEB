import SaveToast from '@/app/_components/_modules/SaveToast';
import { clientPptApi } from '@/services/client/upload';
import { useToastStore } from '@/store/modal';
import { UploadDataType } from '@/types/service';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

// TODO: useSuspenseQuery 사용 버그 처리
export const useGetPresentationData = (slug: number) => {
  const { data: value } = useQuery({
    queryKey: ['upload', slug],
    queryFn: async () => {
      const res = await clientPptApi.getPresentationData(slug);

      if (res.ok) return await res.json();
    },
  });

  return value;
};

export const usePostPresentationData = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToastStore();

  const openToastWithData = () =>
    openToast({
      content: <SaveToast />,
    });
  const postMutation = useMutation({
    mutationKey: ['upload', 'new'],
    mutationFn: async (result: UploadDataType) => {
      return await clientPptApi.postPresentationUpload(result);
    },
    onSuccess: async (response) => {
      openToastWithData();
    },
    onError: () => {
      alert('문제가 발생했습니다.');
    },
  });

  return postMutation;
};

export const usePatchPresentationData = (slug: number | 'new') => {
  const queryClient = useQueryClient();

  const { openToast } = useToastStore();

  const openToastWithData = () =>
    openToast({
      content: <SaveToast />,
    });

  const patchMutation = useMutation({
    mutationKey: ['upload', slug],
    mutationFn: async (result: UploadDataType) => {
      return await clientPptApi.patchPresentationData(slug as number, result);
    },
    onSuccess: async (response) => {
      openToastWithData();
    },
    onError: () => {
      alert('문제가 발생했습니다.');
    },
  });

  return patchMutation;
};
