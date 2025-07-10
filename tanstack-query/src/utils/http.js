import { QueryClient } from '@tanstack/react-query';

import { API_HOST } from './constants';

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm }) {
  let url = `${API_HOST}/events`;

  if (searchTerm) {
    url += `?search=${searchTerm}`;
  }
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function addEvent(eventData) {
  let url = `${API_HOST}/events`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating a new event!');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchAvailableImages({ signal }) {
  let url = `${API_HOST}/events/images`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEventById({ signal, id }) {
  let url = `${API_HOST}/events/${id}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching event details');
    error.code = response.status;
    error.info = await response.json();

    return error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent(id) {
  let url = `${API_HOST}/events/${id}`;

  const response = await fetch(url, { method: 'DELETE' });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching event details');
    error.code = response.status;
    error.info = await response.json();
    return error;
  }

  return response.json();
}
