import { useState, useEffect } from 'react';

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const [error, setError] = useState();

  const handleSuccess = (pos: any) => {
    setLocation(pos.coords);
  };

  const handleError = (e: any) => {
    setError(e.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error };
};

export default useCurrentLocation;
