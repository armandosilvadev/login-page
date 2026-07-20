import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../auth/hooks/useLogin';
import type { LoginData } from '../types/loginData';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import type { ApiError } from '../api/types/ApiError';

const Test = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isError, isPending } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');

    const loginData: LoginData = {
      username: username.trim(),
      password,
    };

    mutate(loginData, {
      onSuccess: userData => {
        localStorage.setItem('token', userData.token);
        navigate('/dashboard');
      },
      onError: error => {
        const axiosError = error as AxiosError<ApiError>;

        setErrorMessage(
          axiosError.response?.data.message ?? 'Error while trying to login.',
        );
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type='checkbox'
            name='showPassword'
            id='showPassword'
            onChange={e => setShowPassword(e.target.checked)}
          />
        </div>
        <button type='submit'>Login</button>
        {isPending ? <span>Connecting...</span> : ''}
        {isError ? <span>{errorMessage}</span> : ''}
        <p>
          Don't have an account?{' '}
          <Link to={'/auth/register'}>Click to register.</Link>
        </p>
      </form>
    </>
  );
};

export default Test;
