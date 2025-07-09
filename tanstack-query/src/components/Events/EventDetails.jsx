import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { API_HOST } from '../../utils/constants.js';
import { deleteEvent, fetchEventById, queryClient } from '../../utils/http.js';
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => fetchEventById({ signal, id })
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    }
  });

  const handleDelete = () => {
    mutate(id);
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
            <button onClick={handleDelete}>Delete</button>
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
