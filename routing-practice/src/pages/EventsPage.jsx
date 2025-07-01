import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events /* , isError, message */ } = useLoaderData();

  // if (isError) {
  //   return <p>{message}</p>;
  // }

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(events) => <EventsList events={events} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;
