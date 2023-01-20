import { useState, useMemo } from 'react';

interface LocationProps {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = async () => {
  const [location, setLocation] = useState<LocationProps>();
  const success = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  };
  const error = () => {
    setLocation({ latitude: 37.483034, longitude: 126.902435 });
    // TODO: 실패시 위치정보를 허용해달라는 메시지가 표시된 페이지로 이동 또는 경고창이나 모달 띄우기
    console.log('위치 받기 실패. 디폴트 위치를 가져옵니다.');
  };

  useMemo(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      error();
      return;
    }
    geolocation.getCurrentPosition(success, error);
  }, [navigator.geolocation.getCurrentPosition]);
  // TODO: redux에 저장해도 될 듯
  return location;
};

export default useCurrentLocation;
