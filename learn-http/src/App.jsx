import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatePlaces, setErrorUpdatePlaces] = useState(null);
  const [isLoadingUserPlaces, setIsLoadingUserPlaces] = useState(false);
  const [errorFetchUserPlaces, setErrorFetchUserPlaces] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function loadUserPlaces() {
      setIsLoadingUserPlaces(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places || []);
        setIsLoadingUserPlaces(false);
      } catch (error) {
        setErrorFetchUserPlaces(error);
        setIsLoadingUserPlaces(false);
      }
    }
    loadUserPlaces();
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
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatePlaces(error);
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
        setUserPlaces(userPlaces);
        setErrorUpdatePlaces(error);
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  return (
    <>
      <Modal
        open={errorUpdatePlaces}
        onClose={() => setErrorUpdatePlaces(null)}
      >
        {errorUpdatePlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorUpdatePlaces.message}
            onConfirm={() => setErrorUpdatePlaces(null)}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorFetchUserPlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorFetchUserPlaces.message}
            onConfirm={() => setErrorFetchUserPlaces(null)}
          />
        )}
        {!errorFetchUserPlaces && (
          <Places
            title="I'd like to visit ..."
            isLoading={isLoadingUserPlaces}
            loadingText="Loading your places..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
