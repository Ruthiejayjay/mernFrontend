import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserPlaces = () => {
  const [loadedPlaces, setLooadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLooadedPlaces(responseData.places);
      } catch (err) { }

    }
    fetchPlaces();
  }, [sendRequest, userId])

  const placeDeletedHandler = deletePlaceId => {
    setLooadedPlaces(prevPlaces =>
      prevPlaces.filter(places => places.id !== deletePlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </>
  )
}

export default UserPlaces
