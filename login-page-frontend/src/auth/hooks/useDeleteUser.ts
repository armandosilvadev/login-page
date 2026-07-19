import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/api';
import type { DeleteData } from '../../types/deleteData';

async function deleteData(data: DeleteData): Promise<void> {
  const response = await api.delete('/auth', {
    data,
  });
  return response.data;
}

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    },
  });
}
