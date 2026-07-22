import { useState } from 'react';
import useDeleteUser from '../../../auth/hooks/useDeleteUser';
import styles from './DeleteAccountModal.module.css';
import type { DeleteData } from '../../../types/deleteData';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../../api/types/ApiError';
import PasswordInput from '../../ui/PasswordInput/PasswordInput';

interface DeleteAccountModalProps {
  isOpen: boolean;
  handleIsOpen(): void;
}

const DeleteAccountModal = ({
  isOpen,
  handleIsOpen,
}: DeleteAccountModalProps) => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutate, isPending, isError } = useDeleteUser();

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');

    const deleteData: DeleteData = {
      password,
    };

    mutate(deleteData, {
      onSuccess: () => {
        localStorage.removeItem('token');
        navigate('/');
      },
      onError: error => {
        const axiosError = error as AxiosError<ApiError>;

        const axiosData = axiosError.response?.data;

        if (axiosData?.status === 401) setErrorMessage('Invalid password.');
        else setErrorMessage('Error while trying to delete account.');
      },
    });
  };

  const handleCancel = () => {
    setPassword('');
    setErrorMessage('');
    handleIsOpen();
  };

  return (
    <div
      className={`${styles.deleteAccountContainer} ${styles[isOpen ? 'show' : 'hidden']} mainBoxStyle`}
    >
      <h3>
        Are you sure you want to delete your account? There's no way back!
      </h3>
      <span>Type your password to confirm</span>
      <form onSubmit={handleSubmit}>
        <div>
          <PasswordInput
            id='password'
            name=''
            value={password}
            handleOnChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.errorMessage}>
          {isPending ? <span>Deleting...</span> : ''}
          {isError ? <span>{errorMessage}</span> : ''}
        </div>

        <div className={styles.btnContainer}>
          <button
            className={styles.confirmBtn}
            type='submit'
          >
            Confirm
          </button>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccountModal;
