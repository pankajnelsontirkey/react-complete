import { useCallback, useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import { AVAILABLE_PLACES } from './data';

import DeleteConfirmation from './components/DeleteConfirmation';
import Modal from './components/Modal';
import Places from './components/Places';
import { sortPlacesByDistance } from './loc';

const storedPlaceIds = JSON.parse(localStorage.getItem('selectedPlaces') || []);
const storedPlaces = storedPlaceIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

console.log(storedPlaces);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedPlaceIds =
      JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedPlaceIds.indexOf(id) === -1) {
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedPlaceIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    setModalIsOpen(false);

    const storedPlaceIds =
      JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(
        storedPlaceIds.filter((id) => id !== selectedPlace.current)
      )
    );
  }, []);

  return (
    <>
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
          have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit..."
          fallbackText='Select the places you would like to visit below.'
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title='Available Places'
          fallbackText='Sorting places by distance...'
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
