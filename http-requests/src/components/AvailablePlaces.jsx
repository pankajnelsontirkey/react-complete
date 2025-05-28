import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch places!');
        }

        setAvailablePlaces(data.places);
      } catch (error) {
        console.log('error');
        setError(error);
      }
      setIsFetching(false);
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
