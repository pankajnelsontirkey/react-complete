import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { API_HOST } from '../../utils/constants.js';
import { deleteEvent, fetchEventById, queryClient } from '../../utils/http.js';
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => fetchEventById({ signal, id })
  });

  const {
    mutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
    }
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        navigate('/events');
      }
    });
  };

  let content = '';

  if (isPending) {
    content = (
      <div id='event-details-content' className='center'>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error?.info?.message || 'Failed to load event details'}
      />
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    content = (
      <>
        <header>
          <h1>{data?.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>
          <img src={`${API_HOST}/${data.image}`} alt={data.title} />
          <div id='event-details-info'>
            <div>
              <p id='event-details-location'>{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id='event-details-description'>{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting ? (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you wish to delete this event?</p>
          <div className='form-actions'>
            {isDeletePending ? <p>Deleting...</p> : null}

            {!isDeletePending ? (
              <>
                <button onClick={handleStopDelete} className='button-text'>
                  Cancel
                </button>
                <button onClick={handleDelete} className='button'>
                  Delete
                </button>
              </>
            ) : null}

            {isDeleteError ? (
              <ErrorBlock
                title='Failed to delete event'
                message={
                  deleteError?.info?.message || 'Error while deleting event'
                }
              />
            ) : null}
          </div>
        </Modal>
      ) : null}
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>

      <article id='event-details'>{content}</article>
    </>
  );
}
