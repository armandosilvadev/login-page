import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type='checkbox'
            name='showPassword'
            id='showPassword'
            onChange={e => setShowPassword(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password: </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='confirmPassword'
            id='confirmPassword'
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Register</button>
        <p>
          Already have an account?
          <Link to={'/auth/login'}>Login.</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
