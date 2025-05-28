import { useFetch } from '../hooks/useFetch.js';
import { fetchAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';
import ErrorPage from './Error.jsx';
import Places from './Places.jsx';

async function getSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
        resolve(sortedPlaces);
      }
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces
  } = useFetch(getSortedPlaces, []);

  if (error) {
    return <ErrorPage title='An error occured' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Finding new places to explore...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
