import { useActionState } from 'react';

import {
  hasMinLength,
  isEmail,
  isEqualToOtherValue,
  isNotEmpty
} from '../util/validation';

function signupAction(prevFormState, formData) {
  const formValues = Object.fromEntries(formData.entries());
  const acquisition = formData.getAll('acquisition');
  formValues['acquisition'] = acquisition;

  let errors = [];

  if (!isEmail(formValues['email'])) {
    errors.push('Invalid email address');
  }

  if (
    !isNotEmpty(formValues['password']) ||
    !hasMinLength(formValues['password'], 6)
  ) {
    errors.push('Password must be at least six characters');
  }

  if (
    !isEqualToOtherValue(formValues['password'], formValues['confirm-password'])
  ) {
    errors.push('Passwords do not much.');
  }

  if (
    !isNotEmpty(formValues['first-name']) ||
    !isNotEmpty(formValues['last-name'])
  ) {
    errors.push('Please provide first name & last name');
  }

  if (!isNotEmpty(formValues['role'])) {
    errors.push('Please select a role');
  }

  if (!formValues['terms']) {
    errors.push('You must agree to the terms and conditions');
  }

  if (formValues.acquisition.length === 0) {
    errors.push('Please select one acquisition channel');
  }

  if (errors.length > 0) {
    return { errors, values: { ...formValues } };
  }

  return { errors: null };
}

export default function Signup() {
  const [formState, formAction /*,  pending */] = useActionState(signupAction, {
    errors: null
  });

  console.log('formState', formState);

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          defaultValue={formState.values?.email}
        />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            defaultValue={formState.values?.password}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            defaultValue={formState.values?.['confirm-password']}
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            name='first-name'
            defaultValue={formState.values?.['first-name']}
          />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            name='last-name'
            defaultValue={formState.values?.['last-name']}
          />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select
          id='role'
          name='role'
          key={formState.values?.role}
          defaultValue={formState.values?.role}
        >
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
            defaultChecked={formState.values?.acquisition?.includes('google')}
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
            defaultChecked={formState.values?.acquisition?.includes('friend')}
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='other'
            name='acquisition'
            value='other'
            defaultChecked={formState.values?.acquisition?.includes('other')}
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            defaultChecked={formState.values?.terms === 'on'}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors ? (
        <ul className='error'>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button className='button'>Sign up</button>
      </p>
    </form>
  );
}
