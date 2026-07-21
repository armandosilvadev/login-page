import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../auth/hooks/useLogin';
import type { LoginData } from '../../types/loginData';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../api/types/ApiError';
import Footer from '../../components/layout/Footer';
import RegisterLink from '../../components/ui/RegisterLink/RegisterLink';

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
            <div className={styles.errorMessageBox}>
              {isPending && <span>Connecting...</span>}
              {isError && <span>{errorMessage}</span>}
            </div>
            <div className={styles.usernameBox}>
              <label htmlFor='username'>Username: </label>
              <input
                type='text'
                name='username'
                id='username'
                required
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.passwordBox}>
              <label htmlFor='password'>Password: </label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  name='showPassword'
                  id='showPassword'
                  className={styles.showPassword}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? (
                    <i className='fa-solid fa-eye'></i>
                  ) : (
                    <i className='fa-solid fa-eye-slash'></i>
                  )}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className={styles.loginBtn}
            >
              Login
            </button>
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
