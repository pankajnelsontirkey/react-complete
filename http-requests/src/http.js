export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places!');
  }

  return data.places;
}
export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = response.json;

  if (!response.ok) {
    throw new Error('Error while updating user places');
  }

  return data;
}
