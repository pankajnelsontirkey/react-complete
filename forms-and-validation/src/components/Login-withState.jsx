import { useInput } from '../hooks/useInput';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import Input from './Input';

export default function Login() {
  const {
    value: email,
    touched: emailTouched,
    handleBlur: emailBlurHandler,
    handleChange: emailChangeHandler
  } = useInput('');

  const {
    value: password,
    touched: passwordTouched,
    handleBlur: passwordBlurHandler,
    handleChange: passwordChangeHandler
  } = useInput('');

  const emailIsInvalid = emailTouched && !isEmail(email) && !isNotEmpty(email);
  const passwordIsInvalid = passwordTouched && !hasMinLength(password, 6);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={email}
          error={emailIsInvalid ? 'Please enter a valid email address' : null}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          value={password}
          error={passwordIsInvalid ? 'Password is too short!' : null}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
