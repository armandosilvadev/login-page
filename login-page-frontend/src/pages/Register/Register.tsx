import styles from './Register.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import useRegister from '../../auth/hooks/useRegister';
import type { LoginData } from '../../types/loginData';
import type { ApiError } from '../../api/types/ApiError';
import Footer from '../../components/layout/Footer';
import LoginLink from '../../components/ui/LoginLink/LoginLink';
import UsernameInput from '../../components/ui/UsernameInput/UsernameInput';
import PasswordInput from '../../components/ui/PasswordInput/PasswordInput';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
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
      onSuccess: userData => {
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
      <main className={styles.register}>
        <div className={`${styles.registerContainer} mainBoxStyle`}>
          <form
            onSubmit={handleSubmit}
            className={styles.registerForm}
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

            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              handleOnChange={e => setConfirmPassword(e.target.value)}
            />

            <button
              type='submit'
              className={styles.registerBtn}
            >
              Register
            </button>

            <div className={styles.errorMessageBox}>
              {!passwordsMatch && (
                <span className={styles.passwordsMatch}>
                  Passwords do not match
                </span>
              )}
              {isPending && <span>Creating...</span>}
              {isError && <span>{errorMessage}</span>}
            </div>

            <p>
              Already have an account? <LoginLink text='Login.' />
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;
