import { useQuery } from '@tanstack/react-query';
import type { UserData } from '../../types/userData';
import { api } from '../../api/api';

async function fetchData(): Promise<UserData> {
  const response = await api.get('/users/me');
  return response.data;
}

export default function () {
  return useQuery({
    queryFn: fetchData,
    queryKey: ['user-data'],
    retry: 2,
  });
}
