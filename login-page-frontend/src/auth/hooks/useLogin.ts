import axios, { type AxiosPromise } from 'axios';
import { API_URL } from '../../variables/apiUrl';
import { useMutation } from '@tanstack/react-query';
import { type UserData } from '../../types/userData';
import type { LoginData } from '../../types/loginData';

async function postData(data: LoginData): AxiosPromise<UserData> {
  const response = await axios.post(API_URL + '/auth/login', data);
  return response;
}

export default function useLogin() {
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
  });

  return mutate;
}
