import { defer, json, redirect } from 'react-router-dom';

import { VITE_API_HOST } from '../utils/constants';

const fetchEvents = async () => {
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
    // return response;
    const { events } = await response.json();
    return events;
  }
};

export const eventsLoader = () => defer({ events: fetchEvents() });

const fetchEventById = async (eventId) => {
  const response = await fetch(`${VITE_API_HOST}/events/${eventId}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch the event details' },
      { status: response.status ?? 500 }
    );
  }
  // return response;
  const { event } = await response.json();
  return event;
};

export const eventByIdLoader = async ({ params: { eventId } }) =>
  defer({ event: await fetchEventById(eventId), events: fetchEvents() });

export const addUpdateEventAction = async ({ request, params }) => {
  const { method } = request;
  const formData = await request.formData();

  const formValues = Object.fromEntries(formData.entries());

  let url = `${VITE_API_HOST}/events`;

  url += method === 'PATCH' ? `/${params.eventId}` : '';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formValues })
  });

  if (response.status === 422) {
    return response;
  }

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
