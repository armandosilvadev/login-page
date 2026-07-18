import axios, { type AxiosPromise } from 'axios';
import { API_URL } from '../../variables/apiUrl';
import { useQuery } from '@tanstack/react-query';
import type { UserData } from '../../types/userData';

async function fetchData(): AxiosPromise<UserData> {
  const token = localStorage.getItem('token');

  const response = axios.get(API_URL + '/users/me', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response;
}

export default function () {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['user-data'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
