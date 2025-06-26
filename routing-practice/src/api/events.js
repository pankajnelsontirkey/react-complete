import { json, redirect } from 'react-router-dom';

import { VITE_API_HOST } from '../utils/constants';

export const eventsLoader = async () => {
  const response = await fetch(`${VITE_API_HOST}/events`);

  if (!response.ok) {
    // // return { isError: true, message: 'Could not fetch events' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), {
    //   status: 500
    // });
    throw json(
      { message: 'Could not fetch events' },
      { status: response.status ?? 500 }
    );
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
      { status: response.status ?? 500 }
    );
  }
  return response;
};

export const addEventAction = async ({ request }) => {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData.entries());

  const response = await fetch(`${VITE_API_HOST}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formValues })
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not save event!' },
      { status: response.status ?? 500 }
    );
  }
  return redirect('/events');
};

export const deleteEventAction = async ({
  request: { method },
  params: { eventId }
}) => {
  const response = await fetch(`${VITE_API_HOST}/events/${eventId}`, {
    method
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event!' },
      { status: response.status ?? 500 }
    );
  }
  return redirect('/events');
};
