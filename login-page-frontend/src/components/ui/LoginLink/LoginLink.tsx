import styles from './LoginLink.module.css';
import { Link } from "react-router-dom"

interface LoginLinkProps {
  text: string;
}

const LoginLink = ({text}: LoginLinkProps) => {
  return <><Link to={'/auth/login'} className={styles.loginLink}>{text}</Link></>
}

export default LoginLink;