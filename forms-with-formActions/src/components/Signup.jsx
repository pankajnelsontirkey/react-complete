import {
  hasMinLength,
  isEmail,
  isEqualToOtherValue,
  isNotEmpty
} from '../util/validation';

export default function Signup() {
  function signupAction(formData) {
    const formValues = Object.fromEntries(formData.entries());
    const acquisition = formData.getAll('acquisition');
    formValues['acquisition'] = acquisition;
    console.log(formValues);

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
      !isEqualToOtherValue(
        formValues['password'],
        formValues['confirm-password']
      )
    ) {
      errors.push('Passwords do not much.');
    }

    if (
      !isNotEmpty(
        formValues['first-name'] || !isNotEmpty(formValues['last-name'])
      )
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
  }

  return (
    <form action={signupAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role'>
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
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input type='checkbox' id='terms-and-conditions' name='terms' />I
          agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button className='button'>Sign up</button>
      </p>
    </form>
  );
}
