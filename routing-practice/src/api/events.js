import { json } from 'react-router-dom';
import { VITE_API_HOST } from '../utils/constants';

export const eventsLoader = async () => {
  const response = await fetch(`${VITE_API_HOST}/events`);

  if (!response.ok) {
    // // return { isError: true, message: 'Could not fetch events' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), {
    //   status: 500
    // });
    throw json({ message: 'Could not fetch events' }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
};

export const eventByIdLoader = async ({ params: { eventId } }) => {
  const response = await fetch(`${VITE_API_HOST}/events/${eventId}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch the event details' },
      { status: response.status }
    );
  } else {
    return response;
  }
};
