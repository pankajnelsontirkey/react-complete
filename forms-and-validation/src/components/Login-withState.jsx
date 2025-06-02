import { useState } from 'react';

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
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            onBlur={handleInputBlur}
            onChange={handleValueChange}
            value={values.email}
          />
          <div className='control-error'>
            {emailIsInvalid ? <p>Please enter a valid email address</p> : null}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            onBlur={handleInputBlur}
            onChange={handleValueChange}
            value={values.password}
          />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
