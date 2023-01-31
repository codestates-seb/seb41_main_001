/* eslint-disable no-new */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import markerImg from '../img/placeholder.png';

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  display: block;

  .customoverlay {
    span {
      padding: 10px;
      border-radius: 10px;
      background-color: white;
      color: black;
      font-weight: 600;
    }
  }
`;

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  overlayvalue?: string;
}

const KakaoMap = ({
  latitude,
  longitude,
  overlayvalue = '현재 위치',
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
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
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
  }, []);

  return <MapContainer id="kakao-map" ref={mapContainer} />;
};

export default KakaoMap;
