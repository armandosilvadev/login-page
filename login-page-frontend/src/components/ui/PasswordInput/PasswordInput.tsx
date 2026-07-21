import { useState } from 'react';
import styles from './PasswordInput.module.css';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({
  id,
  name,
  value,
  handleOnChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  let text: string = '';

  if (name === 'password') text = 'Password: ';
  if (name === 'confirmPassword') text = 'Confirm Password: ';

  return (
    <>
      <div className={styles.passwordBox}>
        <label htmlFor={name}>{text}</label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            name={name}
            id={id}
            required
            value={value}
            onChange={handleOnChange}
          />
          <button
            type='button'
            name='showPassword'
            id='showPassword'
            className={styles.showPassword}
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <i className='fa-solid fa-eye'></i>
            ) : (
              <i className='fa-solid fa-eye-slash'></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
