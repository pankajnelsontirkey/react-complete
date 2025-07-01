import { Suspense } from 'react';
import { Await, useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-details');

  return (
    <>
      <Suspense fallback={<p>Loading event details...</p>}>
        <Await resolve={event}>{(event) => <EventItem event={event} />}</Await>
      </Suspense>
      <Suspense fallback={<p>Loading other events...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}
