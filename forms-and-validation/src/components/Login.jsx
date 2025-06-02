import { useRef } from 'react';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input ref={emailRef} type='email' name='email' />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} type='password' name='password' />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
