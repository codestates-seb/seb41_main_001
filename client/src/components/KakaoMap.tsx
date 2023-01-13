import { useRef, useEffect, MutableRefObject } from 'react';
import Locations from '../utils/Locations';

const KakaoMap = () => {
  const mapRef = useRef<HTMLElement | null>(null);
  const location: any = Locations();

  const initMap = () => {
    if (typeof location !== 'string') {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2,
      };

      const map = new kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
    }
  };

  useEffect(() => {
    kakao.maps.load(() => initMap());
  }, [mapRef, location]);

  return (
    <>
      <div id="map" style={{ width: '400px', height: '400px' }} />
      {/* <button type="button" onClick={() => initMap}>
        현재 위치로 이동
      </button> */}
    </>
  );
};
export default KakaoMap;
