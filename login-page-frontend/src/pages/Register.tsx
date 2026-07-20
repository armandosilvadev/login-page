import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRegister from '../auth/hooks/useRegister';
import type { LoginData } from '../types/loginData';
import type { AxiosError } from 'axios';
import type { ApiError } from '../api/types/ApiError';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isError, isPending } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

    const registerData: LoginData = {
      username,
      password,
    };

    mutate(registerData, {
      onSuccess: response => {
        const userData = response.data;

        localStorage.setItem('token', userData.token);

        navigate('/dashboard');
      },
      onError: error => {
        const axiosError = error as AxiosError<ApiError>;

        const axiosData = axiosError.response?.data;

        if (axiosData?.status === 409) {
          setErrorMessage(
            axiosData.message ?? 'Error while trying to register.',
          );
        } else {
          setErrorMessage('Error while trying to register.');
        }
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type='checkbox'
            name='showPassword'
            id='showPassword'
            onChange={e => setShowPassword(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password: </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='confirmPassword'
            id='confirmPassword'
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        {passwordsMatch ? (
          ''
        ) : (
          <span style={{ color: 'red' }}>
            Passwords do not match
            <br />
          </span>
        )}
        <button type='submit'>Register</button>

        {isPending ? <span>Creating...</span> : ''}
        {isError ? <span>{errorMessage}</span> : ''}
        <p>
          Already have an account?
          <Link to={'/auth/login'}>Login.</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
