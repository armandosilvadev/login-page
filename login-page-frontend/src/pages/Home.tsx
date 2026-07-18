import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to={'/auth/login'}>Login</Link>
      <p>
        Don't have an account?{' '}
        <Link to={'/auth/register'}>Click to register.</Link>
      </p>
    </>
  );
};

export default Home;
