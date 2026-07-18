import { Link } from 'react-router-dom';

const Register = () => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input type='text' name='username' id='username' />
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
