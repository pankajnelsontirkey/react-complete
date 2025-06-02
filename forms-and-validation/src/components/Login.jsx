import { useRef, useState } from 'react';

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const emailValid = email.includes('@');
    const passwordValid = password !== '';

    if (!emailValid) {
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input ref={emailRef} type='email' name='email' noValidate />
          {emailIsInvalid ? (
            <div className='control-error'>
              {emailIsInvalid ? (
                <p>Please enter a valid email address</p>
              ) : null}
            </div>
          ) : null}
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
