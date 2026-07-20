import axios, { type AxiosPromise } from 'axios';
import type { LoginData } from '../../types/loginData';
import type { UserData } from '../../types/userData';
import { API_URL } from '../../variables/apiUrl';
import { useMutation } from '@tanstack/react-query';

async function postData(data: LoginData): AxiosPromise<UserData> {
  const response = await axios.post(API_URL + '/auth/register', data);
  return response;
}

export default function useRegister() {
  const mutate = useMutation({
    mutationFn: postData,
    retry: 1,
  });

  return mutate;
}
