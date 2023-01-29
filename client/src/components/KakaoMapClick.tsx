/* eslint-disable no-new */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import markerImg from '../img/placeholder.png';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  /* display: block; */

  .customoverlay {
    span {
      padding: 10px;
      border-radius: 1rem;
      background-color: rgba(1, 1, 1, 0.2);
      border: 0.05rem solid black;
      color: black;
      font-weight: 600;
    }
  }
`;

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  overlayvalue?: string;
  setValue?: any;
}

const KakaoMapClick = ({
  latitude,
  longitude,
  overlayvalue = '현재 위치',
  setValue,
}: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { kakao } = window;
  const position = new kakao.maps.LatLng(latitude, longitude);
  const mapOptions = {
    center: position, // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current!, mapOptions);

    const imageSrc = markerImg;
    const imageSize = new kakao.maps.Size(53, 60);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );
    // const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage,
    }); // 마커 생성

    // 커스텀 오버레이에 표출될 내용
    const content = `
    <div class="customoverlay">
    <span>${overlayvalue}</span>
    </div>
    `;

    // 커스텀 오버레이 생성
    new kakao.maps.CustomOverlay({
      map,
      position,
      content,
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
    kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      let message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, `;
      message += `경도는 ${latlng.getLng()} 입니다`;
      setValue('lat', latlng.getLat());
      setValue('lon', latlng.getLng());

      const resultDiv = document.getElementById('clickLatlng');
      if (resultDiv !== null) {
        resultDiv.innerHTML = message;
      }
    });
  }, []);

  return <MapContainer id="kakao-map" ref={mapContainer} />;
};

export default KakaoMapClick;
