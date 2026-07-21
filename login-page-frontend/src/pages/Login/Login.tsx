import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../auth/hooks/useLogin';
import type { LoginData } from '../../types/loginData';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../api/types/ApiError';
import Footer from '../../components/layout/Footer';
import RegisterLink from '../../components/ui/RegisterLink/RegisterLink';
import UsernameInput from '../../components/ui/UsernameInput/UsernameInput';
import PasswordInput from '../../components/ui/PasswordInput/PasswordInput';

const Test = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

        if (axiosError.response?.data.status === 401) {
          setErrorMessage(
            axiosError.response?.data.message ?? 'Error while trying to login.',
          );
        } else {
          setErrorMessage('Error while trying to login.');
        }
      },
    });
  };

  return (
    <>
      <main className={styles.login}>
        <div className={`${styles.loginContainer} mainBoxStyle`}>
          <form
            onSubmit={handleSubmit}
            className={styles.loginForm}
          >
            <UsernameInput
              value={username}
              handleOnChange={e => setUsername(e.target.value)}
            />

            <PasswordInput
              id='password'
              name='password'
              value={password}
              handleOnChange={e => setPassword(e.target.value)}
            />

            <button
              type='submit'
              className={styles.loginBtn}
            >
              Login
            </button>

            <div className={styles.errorMessageBox}>
              {isPending && <span>Connecting...</span>}
              {isError && <span>{errorMessage}</span>}
            </div>

            <p>
              Don't have an account? <RegisterLink text='Click to register.' />
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Test;
