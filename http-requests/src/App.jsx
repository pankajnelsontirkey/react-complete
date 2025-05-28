import { useCallback, useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import ErrorPage from './components/Error.jsx';
import Modal from './components/Modal.jsx';
import Places from './components/Places.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true);
        const places = await fetchUserPlaces();

        setUserPlaces(places);
      } catch (error) {
        console.log('error', error);
        setUserPlaces(userPlaces);
        setIsFetching(false);
        setError({
          message: error.message || 'Error while fetching user places!'
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([...userPlaces, selectedPlace]);
    } catch (error) {
      console.log(error);
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places!'
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        console.log('error', error);
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place'
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces ? (
          <ErrorPage
            title='An error occurred'
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        ) : null}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt='Stylized globe' />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error ? (
          <ErrorPage title='An error occurred' message={error.message} />
        ) : null}
        {!error ? (
          <Places
            title="I'd like to visit ..."
            loadingText='Fetching saved places...'
            isLoading={isFetching}
            fallbackText='Select the places you would like to visit below.'
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        ) : null}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
