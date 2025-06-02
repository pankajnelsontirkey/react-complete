import { useState } from 'react';

import Input from './Input';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [valuesTouched, setValuesTouched] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = valuesTouched.email && !values.email.includes('@');
  const passwordIsInvalid =
    valuesTouched.password && values.password.trim().length < 6;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
  }

  function handleValueChange({ target: { value, name } }) {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setValuesTouched((prevValues) => ({ ...prevValues, [name]: false }));
  }

  function handleInputBlur({ target: { name } }) {
    setValuesTouched((prevValues) => ({ ...prevValues, [name]: true }));
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
          onBlur={handleInputBlur}
          onChange={handleValueChange}
          value={values.email}
          error={emailIsInvalid ? 'Please enter a valid email address' : null}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={handleInputBlur}
          onChange={handleValueChange}
          value={values.password}
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
