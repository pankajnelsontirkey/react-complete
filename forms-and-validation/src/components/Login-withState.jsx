import { useInput } from '../hooks/useInput';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import Input from './Input';

export default function Login() {
  const {
    value: email,
    handleBlur: emailBlurHandler,
    handleChange: emailChangeHandler,
    hasError: emailError
  } = useInput(
    '',
    // isEmail
    (value) => isNotEmpty(value) && isEmail(value)
  );

  const {
    value: password,
    hasError: passwordError,
    handleBlur: passwordBlurHandler,
    handleChange: passwordChangeHandler
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(e) {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    console.log(email, password);
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
          error={emailError ? 'Please enter a valid email address' : null}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          value={password}
          error={passwordError ? 'Password is too short!' : null}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
