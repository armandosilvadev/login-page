import Footer from '../../components/layout/Footer';
import RegisterLink from '../../components/ui/RegisterLink/RegisterLink';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <main className={styles.home}>
        <div className={styles.homeContainer}>
          <h1>Welcome!</h1>
          <Link
            to={'/auth/login'}
            className={styles.loginLink}
          >
            Login
          </Link>
          <p>
            Don't have an account? <RegisterLink text='Click to register.' />
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
