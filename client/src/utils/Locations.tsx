/* eslint-disable @typescript-eslint/indent */
import { useState, useMemo } from 'react';

const Locations = () => {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  useMemo(() => {
    if (navigator.geolocation) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        latitude: 37.483034,
        longitude: 126.902435,
      });
      console.log('위치 받기 실패');
    }
  }, [navigator.geolocation.getCurrentPosition]);

  return location;
};
export default Locations;
