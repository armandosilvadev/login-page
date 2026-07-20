import { useNavigate } from 'react-router-dom';
import styles from './LogoutModal.module.css';

interface LogoutModalProps {
  isOpen: boolean;
  handleIsOpen(): void;
}

const LogoutModal = ({ isOpen, handleIsOpen }: LogoutModalProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      className={`${styles.logoutContainer} ${styles[isOpen ? 'show' : 'hidden']}`}
    >
      <h3>Are you sure you want to logout?</h3>
      <div>
        <button onClick={handleLogout}>Yes</button>
        <button onClick={handleIsOpen}>No</button>
      </div>
    </div>
  );
};

export default LogoutModal;
