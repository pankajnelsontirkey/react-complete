import { use, useActionState } from 'react';

import { OpinionsContext } from '../store/opinions-context';

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function submitOpinionAction(prevFormState, formData) {
    const values = Object.fromEntries(formData.entries());

    let errors = [];

    if (values?.userName.trim().length < 6) {
      errors.push('Username must be at least 6 characters long.');
    }

    if (values?.title.trim().length < 6) {
      errors.push('Title must be at least 6 characters long.');
    }
    if (!values?.body) {
      errors.push('Text is required');
    }

    if (errors.length > 0) {
      return { errors, values };
    }

    const { userName, title, body } = values;

    await addOpinion({ userName, title, body });

    return { errors: null };
  }

  const [formState, formAction /* , pending */] = useActionState(
    submitOpinionAction,
    { errors: null }
  );

  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={formState?.values?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={formState?.values?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={formState?.values?.body}
          ></textarea>
        </p>

        {formState.errors ? (
          <ul className='errors'>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}

        <p className='actions'>
          <button type='submit'>Submit</button>
        </p>
      </form>
    </div>
  );
}
