import { API_HOST } from './constants';

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
