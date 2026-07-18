import useUser from '../auth/hooks/useUser';

const Dashboard = () => {
  const { data, isLoading } = useUser();

  return (
    <>
      <h1>{isLoading ? 'Loading...' : `Hello ${data?.username}`}</h1>
    </>
  );
};

export default Dashboard;
