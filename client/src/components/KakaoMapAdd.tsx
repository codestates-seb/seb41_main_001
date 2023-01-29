/* eslint-disable no-new */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import markerImg from '../img/placeholder.png';

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  display: block;
  color: black;

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

const KakaoMapAdd = ({
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
  const geocoder = new kakao.maps.services.Geocoder();

  function searchAddrFromCoords(coords: any, callback: any) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  function searchDetailAddrFromCoords(coords: any, callback: any) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      const infoDiv = document.getElementById('centerAddr');

      for (let i = 0; i < result.length; i += 1) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          infoDiv!.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  }

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

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      searchDetailAddrFromCoords(
        mouseEvent.latLng,
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            let detailAddr = result[0].road_address
              ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
              : '';
            detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

            const content =
              `<div class="bAddr">` +
              `<span class="title">법정동 주소정보</span>${detailAddr}</div>`;

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        },
      );
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', () => {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

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

export default KakaoMapAdd;
