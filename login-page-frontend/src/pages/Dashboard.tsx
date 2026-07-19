import { useNavigate } from 'react-router-dom';
import useUser from '../auth/hooks/useUser';
import DeleteAccountModal from '../components/DeleteAccountModal';
import { useState } from 'react';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleIsModalOpen = () => {
    setIsModalOpen(prev => !prev);
  };

  const { data, isLoading } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <h1>{isLoading ? 'Loading...' : `Hello ${data?.username}`}</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleIsModalOpen}>Delete account</button>
      </div>
      <DeleteAccountModal
        isOpen={isModalOpen}
        handleIsOpen={handleIsModalOpen}
      />
    </>
  );
};

export default Dashboard;
