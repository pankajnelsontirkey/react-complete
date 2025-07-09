import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { addEvent, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending ? 'Submitting...' : null}
        <>
          <Link to='../' className='button-text'>
            Cancel
          </Link>
          <button type='submit' className='button'>
            Create
          </button>
        </>
      </EventForm>
      {isError ? (
        <ErrorBlock
          title='Failed to add event'
          message={
            error.info.message ||
            'Failed to add event, please check inputs and try again.'
          }
        />
      ) : null}
    </Modal>
  );
}
