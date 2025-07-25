// import { useState } from 'react';
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const responseData = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === 'submitting';

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {responseData?.errors ? (
          <ul>
            {Object.values(responseData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        ) : null}
        {responseData?.message ? <p>{responseData.message}</p> : null}
        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>

          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : isLogin ? 'Login' : 'Signup'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
