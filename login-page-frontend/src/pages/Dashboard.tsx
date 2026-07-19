import { useNavigate } from 'react-router-dom';
import useUser from '../auth/hooks/useUser';

const Dashboard = () => {
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
      </div>
    </>
  );
};

export default Dashboard;
