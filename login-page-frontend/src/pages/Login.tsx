import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../auth/hooks/useLogin';
import type { LoginData } from '../types/loginData';
import { useState } from 'react';

const Test = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginData = {
      username,
      password,
    };

    mutate(loginData, {
      onSuccess: response => {
        const userData = response.data;

        localStorage.setItem('token', userData.token);
        navigate('/dashboard');
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
        <p>
          Don't have an account?{' '}
          <Link to={'/auth/register'}>Click to register.</Link>
        </p>
      </form>
    </>
  );
};

export default Test;
