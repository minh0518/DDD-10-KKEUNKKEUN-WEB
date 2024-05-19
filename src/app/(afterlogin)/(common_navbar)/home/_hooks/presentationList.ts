import { clientHomeApi } from '@/services/client/home';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

  const response = useMutation({
    mutationKey: ['delete', id],
    mutationFn: async () => {
      const response = await clientHomeApi.deletePresentationList({ presentationIds: [id] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home', 'list'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return response;
};
