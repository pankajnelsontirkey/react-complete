import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialState) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const places = await fetchFn();

        setFetchedData(places);
      } catch (error) {
        console.log('error', error);

        setError({
          message: error.message || 'Error while fetching data!'
        });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return { isFetching, fetchedData, error };
}
