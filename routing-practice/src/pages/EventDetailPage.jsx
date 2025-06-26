import { useLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const { event: eventData } = useLoaderData();

  return (
    <>
      <h1>Data Details Page</h1>
      <EventItem event={eventData} />
    </>
  );
}
