import { useMutation } from '@tanstack/react-query';
import { type UserData } from '../../types/userData';
import type { LoginData } from '../../types/loginData';
import { api } from '../../api/api';

async function postData(data: LoginData): Promise<UserData> {
  const response = await api.post<UserData>('/auth/login', data);
  return response.data;
}

export default function useLogin() {
  return useMutation({
    mutationFn: postData,
    retry: 2,
  });
}
