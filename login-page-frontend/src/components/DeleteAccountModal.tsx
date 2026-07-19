import { useState } from 'react';
import useDeleteUser from '../auth/hooks/useDeleteUser';
import styles from './DeleteAccountModal.module.css';
import type { DeleteData } from '../types/deleteData';
import { useNavigate } from 'react-router-dom';

interface DeleteAccountModalProps {
  isOpen: boolean;
  handleIsOpen(): void;
}

const DeleteAccountModal = ({
  isOpen,
  handleIsOpen,
}: DeleteAccountModalProps) => {
  const [password, setPassword] = useState<string>('');

  const { mutate } = useDeleteUser();

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deleteData: DeleteData = {
      password,
    };

    mutate(deleteData, {
      onSuccess: () => {
        localStorage.removeItem('token');
        navigate('/');
      },
    });
  };

  return (
    <div
      className={`${styles.deleteAccountContainer} ${styles[isOpen ? 'show' : 'hidden']}`}
    >
      <span>
        Are you sure you want to delete your account? There's no way back!
      </span>
      <span>Type your password to confirm</span>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='password'
          onChange={e => setPassword(e.target.value)}
        />

        <div>
          <button type='submit'>Confirm</button>
          <button onClick={handleIsOpen}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccountModal;
