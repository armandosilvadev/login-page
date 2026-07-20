import styles from './RegisterLink.module.css';
import { Link } from "react-router-dom"

interface RegisterLinkProps {
  text: string;
}

const RegisterLink = ({text}: RegisterLinkProps) => {
  return <><Link to={'/auth/register'} className={styles.registerLink}>{text}</Link></>
}

export default RegisterLink;