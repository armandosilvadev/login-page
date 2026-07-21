import styles from './Dashboard.module.css';
import useUser from '../../auth/hooks/useUser';
import DeleteAccountModal from '../../components/DeleteAccountModal';
import { useState } from 'react';
import LogoutModal from '../../components/LogoutModal';
import Footer from '../../components/layout/Footer';

const Dashboard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleIsDeleteModalOpen = () => {
    setIsDeleteModalOpen(prev => !prev);
    setIsLogoutModalOpen(false);
  };

  const handleIsLogoutModalOpen = () => {
    setIsLogoutModalOpen(prev => !prev);
    setIsDeleteModalOpen(false);
  };

  const { data, isLoading } = useUser();

  return (
    <>
      <main className={styles.dashboard}>
        <div className={`${styles.dashboardContainer} mainBoxStyle`}>
          <h1>{isLoading ? 'Loading...' : `Hello ${data?.username}!`}</h1>
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
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
