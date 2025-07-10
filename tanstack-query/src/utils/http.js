import { QueryClient } from '@tanstack/react-query';

import { API_HOST } from './constants';

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = `${API_HOST}/events`;

  if (searchTerm && max) {
    url += `?search=${searchTerm}&max=${max}`;
  } else if (searchTerm) {
    url += `?search=${searchTerm}`;
  } else if (max) {
    url += `?max=${max}`;
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

    throw error;
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
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  let url = `${API_HOST}/events/${id}`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the evnet');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
