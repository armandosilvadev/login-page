import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Developed by:{' '}
        <Link
          to={'https://armandodev.com.br/'}
          target='_blank'
        >
          armandodev
        </Link>{' '}
        &copy; 2026
      </p>
      <ul className={styles.footerList}>
        <li>
          <Link to={'https://armandodev.com.br/'}>Website</Link>
        </li>
        <li>
          <Link to={'https://github.com/armandosilvadev'}>Github</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
