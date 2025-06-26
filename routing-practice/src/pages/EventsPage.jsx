import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events /* , isError, message */ } = useLoaderData();

  // if (isError) {
  //   return <p>{message}</p>;
  // }

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;
