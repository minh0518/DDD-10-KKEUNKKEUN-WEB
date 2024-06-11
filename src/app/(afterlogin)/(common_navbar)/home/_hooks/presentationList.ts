import { clientHomeApi } from '@/services/client/home';
import { clientPptApi } from '@/services/client/upload';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetLatestPresentation = () => {
  const response = useQuery({
    queryKey: ['home', 'latest'],
    queryFn: async () => {
      const response = await clientHomeApi.getLatestPresentation();
      return await response.json();
    },
  });
  return response;
};

export const useDeletePresentation = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const response = useMutation({
    mutationKey: ['delete', id],
    mutationFn: async () => {
      await clientHomeApi.deletePresentationList({ presentationIds: [id] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['home', 'latest'] });
      router.refresh();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return response;
};

export const useStartPresentation = (presentationId: number, start: boolean) => {
  const router = useRouter();
  const response = useQuery({
    queryKey: [presentationId, 'start'],
    queryFn: async () => {
      try {
        const response = await clientPptApi.getPracticeStart(presentationId);
        router.push(`/setting/${presentationId}`);
        return await response.json();
      } catch (e) {
        if (e instanceof Error) alert(e.message);
      }
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!start,
  });
  return response;
};
