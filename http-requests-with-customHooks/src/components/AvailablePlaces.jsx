import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            const sortedPlaces = sortPlacesByDistance(
              places,
              latitude,
              longitude
            );
            setAvailablePlaces(sortedPlaces);
            setIsFetching(false);
          }
        );
      } catch (error) {
        console.log('error', error);
        setError(error);
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

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
