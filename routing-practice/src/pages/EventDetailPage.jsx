import { useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const { event } = useRouteLoaderData('event-details');

  return (
    <>
      <h1>Data Details Page</h1>
      <EventItem event={event} />
    </>
  );
}
