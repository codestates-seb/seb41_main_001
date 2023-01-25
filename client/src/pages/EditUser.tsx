import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
// import Tag from '../components/Tag';
import KakaoMap from '../components/KakaoMap';

// declare global {
//   interface Window {
//     kakao: any;
//   }
//   const kakao: any;
// }

const EditContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 10rem;
`;

const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  > div:first-child {
    text-shadow: white 0 0 3px;
    font-size: 24px;
    margin: 20px;
    text-align: center;
  }
  > span {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const PersonalInfo = styled.div`
  border: 2px solid white;
  padding: 10px;
  margin: 10px 0 10px 10px;
  border-radius: 20px;
  padding: 40px 0px 40px 20px;
`;

const InfoBlock = styled.label`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 8px;
  > div:first-child {
    width: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text-shadow: white 0 0 5px;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 20px;
  }
  input {
    margin-bottom: 15px;
    background-color: var(--gray);
    padding: 5px;
    margin-left: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid gray;
    width: 13rem;
    outline: none;
    color: white;
    &:focus-within {
      border-bottom: 2px solid white;
      transition: 0.2s ease-in-out;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 20px var(--gray) inset;
      -webkit-text-fill-color: var(--gray);
      color: white;
    }
  }
  > button {
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    padding: 0 0.5rem;
    background-color: var(--gray);
    margin: 0 2rem;
    &:hover {
      background-color: black;
    }
  }
  #map {
    width: 20rem;
    height: 21rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    > #locationButton {
      padding: 1rem 2rem;
      background-color: var(--gray);
      &:hover {
        background-color: black;
        cursor: pointer;
      }
    }
    > button {
      margin-top: 1rem;
      border: 1px solid white;
      border-radius: 15px;
      cursor: pointer;
      color: white;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
      margin: 5px 5px 0px 0;
      font-size: 15px;
      > i {
        color: white;
        font-size: 16px;
        margin-left: 15px;
        &:hover {
          color: var(--neon-blue);
          transition: 0.2s ease-in-out;
        }
      }
    }
  }
`;

const Pfp = styled.img<PreviewPfp>`
  width: 150px;
  height: 150px;
  border: 2px solid white;
  border-radius: 100px;
  margin: 0 10px;
`;

const Button = styled(Link)`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
  margin: 15px 30px;
  font-size: 20px;
  height: 50px;
  text-align: center;
  display: flex;
  text-decoration: none;
  color: white;
  justify-content: center;
  i {
    padding-right: 10px;
  }
  &:hover {
    background-color: black;
    text-shadow: white 0 0 5px;
    transition: 0.2s ease-in-out;
  }
`;

const NoLinkButton = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  margin: 3px 0px 15px 20px;
  font-size: 14px;
  text-align: center;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 35px;
  background-color: var(--gray);
  padding: 5px 10px;
  i {
    padding-right: 5px;
  }
  &:hover {
    background-color: black;
    text-shadow: white 0 0 5px;
    transition: 0.2s ease-in-out;
  }
`;

const InputButton = styled.label`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  margin: 3px 0px 15px 20px;
  font-size: 14px;
  height: 35px;
  text-align: center;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--gray);
  padding: 5px 10px;
  cursor: pointer;
  > input {
    display: none;
  }
  i {
    padding-right: 5px;
  }
  &:hover {
    background-color: black;
    text-shadow: white 0 0 5px;
    transition: 0.2s ease-in-out;
  }
`;

const TagContainer = styled.div`
  fieldset {
    display: flex;
    flex-direction: row;
    width: 25rem;
    flex-wrap: wrap;
    border: none;
    padding-left: 0;
    margin-left: 0;
  }
`;

interface PreviewPfp {
  src: string;
}

// interface Location {
//   coords: any;
//   timestamp: any;
// }

// interface Coordinates {
//   latitude: number;
//   longitude: number;
//   timestamp: number;
// }
interface UserFormInput {
  nickname: string;
  curpassword: string;
  newpassword: string;
  phone: string;
  place: string;
  tags: string;
}

// interface location {
//   longitude: number;
//   latitude: number;
// }

const EditUser = () => {
  const { id } = useParams();
  // const [coordinate, setCoordinate] = useState<Coordinates>({
  //   latitude: 126,
  //   longitude: 126,
  //   timestamp: 1,
  // });
  const [img, setImg] = useState<any>(
    'https://cdn.discordapp.com/attachments/1030817860047618119/1030866099694211203/BackgroundEraser_20221016_002309876.png',
  );
  const { register, handleSubmit } = useForm<UserFormInput>();
  const onSubmit = (data: UserFormInput) => console.log(data);

  // const imgRef = useRef<any>();
  // function readImage(input: any) {
  //   // 인풋 태그에 파일이 있는 경우
  //   if (input.files && input.files[0]) {
  //     // FileReader 인스턴스 생성
  //     const reader = new FileReader();

  //     // 이미지가 로드가 된 경우
  //     reader.onload = (e: any) => {
  //       const previewImage = document.getElementById(
  //         'preview-image',
  //       ) as PreviewPfp & HTMLImageElement;
  //       previewImage.src = e.target.result;
  //     };

  //     // reader가 이미지 읽도록 하기
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  // // input file에 change 이벤트 부여
  // const saveImgFile = () => {
  //   const file = (imgRef:any).(current:any).files[0];
  //   const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //         setImg(reader.result);
  //      };
  // };
  const changeImg = () => {
    const inputImage = document.getElementById(
      'changeFile',
    ) as HTMLInputElement;
    setImg(inputImage.value);
    console.log(img);
  };
  const deleteImg = () => {
    setImg(
      'https://cdn.discordapp.com/attachments/1030817860047618119/1030866099694211203/BackgroundEraser_20221016_002309876.png',
    );
  };
  // inputImage.addEventListener('change', (e) => {
  //   readImage(e.target);
  // });
  // function success({ coords, timestamp }: Location) {
  //   const { latitude, longitude } = coords;
  //   setCoordinate({
  //     latitude,
  //     longitude,
  //     timestamp,
  //   });
  //   console.log('actually, yeah', latitude, longitude);
  //   console.log(
  //     'this is what u get',
  //     coordinate.latitude,
  //     coordinate.longitude,
  //   );
  //   alert(
  //     `위도: ${coordinate.latitude},
  //      경도: ${coordinate.longitude},
  //      위치 반환 시간: ${coordinate.timestamp},`
  //   );
  //   // location.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  // }

  // const getUserLocation = () => {
  //   if (!navigator.geolocation) {
  //     throw Object.assign(new Error('위치 정보가 지원되지 않습니다.'));
  //   }
  //   navigator.geolocation.getCurrentPosition(success);
  // };

  // useEffect(() => {
  //   getUserLocation();
  //   const script = document.createElement('script');
  //   script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=2a51fcab7ce5015f76fc7c20fc68714c';
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  return (
    <EditContainer onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <div>회원정보 수정</div>
        <PersonalInfo>
          <InfoBlock htmlFor="pfp">
            <div>프로필 사진</div>
            <div>
              <Pfp id="preview-image" src={img} />
            </div>
            <div>
              <InputButton htmlFor="changeFile" onClick={changeImg}>
                <i className="fa-solid fa-arrows-rotate" />
                변경
                <input
                  type="file"
                  name="changeFile"
                  id="changeFile"
                  accept="image/jpeg,image/jpg, image/png, image/svg"
                />
              </InputButton>
              <NoLinkButton onClick={deleteImg}>
                <i className="fa-solid fa-trash" />
                삭제
              </NoLinkButton>
            </div>
          </InfoBlock>
          <InfoBlock htmlFor="nickname">
            <div>닉네임</div>
            <input
              type="text"
              placeholder="NickName"
              {...register('nickname', { required: true })}
            />
            <button type="button">중복 확인</button>
          </InfoBlock>
          <InfoBlock htmlFor="formerPassword">
            <div>기존 비밀번호</div>
            <input
              type="password"
              {...register('curpassword', { required: true })}
            />
          </InfoBlock>
          <InfoBlock htmlFor="newPassword">
            <div>새 비밀번호</div>
            <input type="password" {...register('newpassword')} />
          </InfoBlock>
          <InfoBlock htmlFor="newPasswordCheck">
            <div>새 비밀번호 확인</div>
            <input type="password" name="newPasswordCheck" />
          </InfoBlock>
          <InfoBlock htmlFor="phone">
            <div>휴대폰 번호</div>
            <input
              type="tel"
              placeholder="010-1234-5678"
              {...register('phone')}
            />
            <button type="button">중복 확인</button>
          </InfoBlock>
          <InfoBlock htmlFor="location">
            <div>등록 지역 변경</div>
            <div>
              <div>
                <div id="map">
                  <KakaoMap longitude={127} latitude={36} />
                  <button type="button" id="locationButton">
                    현재 위치 추가
                  </button>
                </div>
              </div>
              <div>
                서울시 강서구
                <i className="fa-solid fa-xmark" />
              </div>
              <div>
                수원시
                <i className="fa-solid fa-xmark" />
              </div>
            </div>
          </InfoBlock>
          <InfoBlock htmlFor="tags">
            <div>등록 태그 변경</div>
            <TagContainer>
              <fieldset />
            </TagContainer>
          </InfoBlock>
        </PersonalInfo>
        <span>
          <Button to={`/members/mypage/${id}`}>
            <i className="fa-solid fa-square-check" />
            저장하기
          </Button>
          <Button to={`/members/mypage/${id}`}>
            <i className="fa-solid fa-xmark" />
            취소하기
          </Button>
        </span>
      </Container>
    </EditContainer>
  );
};

export default EditUser;
