import styles from './Dashboard.module.css';
import useUser from '../../auth/hooks/useUser';
import DeleteAccountModal from '../../components/modal/DeleteAccountModal/DeleteAccountModal';
import { useState } from 'react';
import LogoutModal from '../../components/modal/LogouModal/LogoutModal';
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

  const { data, isLoading, isError } = useUser();

  return (
    <>
      <main className={styles.dashboard}>
        <div className={`${styles.dashboardContainer} mainBoxStyle`}>
          {isError && (
            <h1 className={styles.errorMessage}>
              Error when trying to load user.
            </h1>
          )}
          <h1>
            {isLoading ? (
              'Loading...'
            ) : (
              <span>
                Hello <span className={styles.username}>{data?.username}</span>!
              </span>
            )}
          </h1>
          <div className={styles.btnContainer}>
            <button
              className={styles.logoutBtn}
              onClick={handleIsLogoutModalOpen}
            >
              Logout
            </button>
            <button
              className={styles.deleteAccountBtn}
              onClick={handleIsDeleteModalOpen}
            >
              Delete account
            </button>
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
