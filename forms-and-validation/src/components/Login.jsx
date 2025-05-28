import { useState } from 'react';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  function handleValueChange({ target: { value, name } }) {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
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
            onChange={handleValueChange}
            value={values.email}
          />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
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
