import useUser from '../auth/hooks/useUser';
import DeleteAccountModal from '../components/DeleteAccountModal';
import { useState } from 'react';
import LogoutModal from '../components/LogoutModal';

const Dashboard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleIsDeleteModalOpen = () => {
    setIsDeleteModalOpen(prev => !prev);
  };

  const handleIsLogoutModalOpen = () => {
    setIsLogoutModalOpen(prev => !prev);
  };

  const { data, isLoading } = useUser();

  return (
    <>
      <h1>{isLoading ? 'Loading...' : `Hello ${data?.username}`}</h1>
      <div>
        <button onClick={handleIsLogoutModalOpen}>Logout</button>
        <button onClick={handleIsDeleteModalOpen}>Delete account</button>
      </div>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        handleIsOpen={handleIsDeleteModalOpen}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        handleIsOpen={handleIsLogoutModalOpen}
      />
    </>
  );
};

export default Dashboard;
