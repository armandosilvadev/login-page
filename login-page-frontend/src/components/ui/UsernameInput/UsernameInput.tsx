import styles from './UsernameInput.module.css';

interface UsernameInputProps {
  value: string;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

const UsernameInput = ({ value, handleOnChange }: UsernameInputProps) => {
  return (
    <>
      <div className={styles.usernameBox}>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          id='username'
          required
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default UsernameInput;
