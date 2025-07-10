import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { fetchEventById, queryClient, updateEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEventById({ id, signal })
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async ({ id, event }) => {
      await queryClient.cancelQueries(['events', id]);
      const previousEvent = queryClient.getQueryData(['events', id]);
      queryClient.setQueryData(['events', id], event);
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]);
    }
  });

  function handleSubmit(formData) {
    const event = formData;
    mutate({ id, event });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content = '';

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error?.info?.message ||
            'Failed to load event. Please check your network.'
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to='../' className='button-text'>
          Cancel
        </Link>
        <button type='submit' className='button'>
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
