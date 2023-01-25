import styled from 'styled-components';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Tag from '../components/Tag';
import KakaoMap from '../components/KakaoMap';
import useCurrentLocation from '../utils/useCurrentLocation';
// declare global {
//   interface Window {
//     kakao: any;
//   }
//   const kakao: any;
// }

const EditContainer = styled.form`
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
      -webkit-text-fill-color: white;
      color: white;
    }
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 8px;
  > label:first-child {
    width: 120px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    text-shadow: white 0 0 5px;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 20px;
  }
  > button {
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    padding: 0 0.5rem;
    background-color: var(--gray);
    margin: 0 2rem;
    &:hover {
      transition: 0.2s ease-in-out;
      text-shadow: white 0 0 5px;
      background-color: var(--neon-yellow);
      color: black;
      border: 1px solid var(--neon-yellow);
      cursor: pointer;
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
    margin-left: 0.8rem;
    > #locationButton {
      padding: 1rem 2rem;
      background-color: var(--gray);
      &:hover {
        transition: 0.2s ease-in-out;
        text-shadow: white 0 0 5px;
        background-color: var(--neon-yellow);
        color: black;
        border: 1px solid var(--neon-yellow);
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
          color: var(--neon-red);
          text-shadow: white 0 0 2px;
          transition: 0.2s ease-in-out;
          cursor: pointer;
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

const Button = styled.button`
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
  background-color: var(--gray);
  cursor: pointer;
  i {
    padding-right: 10px;
  }
  &:hover {
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
  }
`;

const TempButton = styled(Link)`
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
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
  }
`; // 임시 버튼, 버튼에 기능 넣으면 navigate 쓰고 Button으로 통일하자

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
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
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
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
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
  curPassword: string;
  newPassword: string;
  newPasswordCheck: string;
  phone: string;

  // locations: string[];
  // memberTags: {
  //   tagId: number;
  //   tagName: string;
  // }[];
}

// interface location {
//   longitude: number;
//   latitude: number;
// }

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // });
  const [nickCheck, setNickCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [img, setImg] = useState<string>(
    'https://cdn.discordapp.com/attachments/1030817860047618119/1030866099694211203/BackgroundEraser_20221016_002309876.png',
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInput>();
  const onSubmitHandler: SubmitHandler<UserFormInput> = (data) => {
    console.log('data is ', data);
    console.log('error is ', errors);
    navigate(`/members/mypage/${id}`);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change', event.target.value);
  };
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useCurrentLocation().then((res) => {
    if (res === undefined) return;
    setLocation(res);
  });

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
  const locationAdd = () => {
    alert(`위도 : ${location?.latitude}, 경도 : ${location?.longitude}`);
  };
  // inputImage.addEventListener('change', (e) => {
  //   readImage(e.target);
  // });

  const nicknameCheck = () => {
    const name = (document.getElementById('nickname') as HTMLInputElement)
      .value;
    axios
      .get(`/members/signup/check-nickname/${name}`)
      .then((res: any) => {
        console.log(res);
        if (res.data === true) {
          alert('이미 존재하는 닉네임입니다!');
        } else {
          setNickCheck(true);
        }
      })
      .catch((err: any) => console.log(err));
  };
  const phoneNumCheck = () => {
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    axios
      .get(`/members/signup/check-phone/${phone}`)
      .then((res: any) => {
        console.log(res);
        if (res.data === true) {
          alert('이미 존재하는 휴대폰 번호입니다!');
        } else {
          setPhoneCheck(true);
        }
      })
      .catch((err: any) => console.log(err));
  };
  return (
    <EditContainer onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <div>회원정보 수정</div>
        <PersonalInfo>
          <InfoBlock>
            <label htmlFor="pfp">프로필 사진</label>
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
          <InfoBlock>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              defaultValue="NickName"
              disabled={nickCheck}
              {...register('nickname', {
                required: true,
              })}
            />
            {errors.nickname && <span>닉네임을 입력하세요</span>}
            <NoLinkButton type="button" onClick={nicknameCheck}>
              {nickCheck ? '확인 완료' : '중복 확인'}
            </NoLinkButton>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="formerPassword">기존 비밀번호</label>
            <input
              id="curPassword"
              type="password"
              {...register('curPassword', { required: true })}
            />
            {errors.curPassword && <span>현재 비밀번호를 입력하세요</span>}
          </InfoBlock>
          {/* <InfoBlock>
            <label htmlFor="newPassword">새 비밀번호</label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword')}
            />
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
            <input
              id="newPasswordCheck"
              type="password"
              {...register('newPasswordCheck')}
            />
          </InfoBlock> */}
          <InfoBlock>
            <label htmlFor="phone">휴대폰 번호</label>
            <input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              disabled={phoneCheck}
              {...register('phone', { required: true })}
            />
            {errors.phone && <span>핸드폰 번호를 입력하세요</span>}
            <NoLinkButton type="button" onClick={phoneNumCheck}>
              {phoneCheck ? '확인 완료' : '중복 확인'}
            </NoLinkButton>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="location">등록 지역 변경</label>
            <div>
              <div id="map">
                {location && (
                  <KakaoMap
                    latitude={location.latitude}
                    longitude={location.longitude}
                  />
                )}
                <button type="button" id="locationButton" onClick={locationAdd}>
                  현재 위치 추가
                </button>
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
          <InfoBlock>
            <label htmlFor="tags">등록 태그 변경</label>
            <TagContainer>
              <fieldset>
                <Tag
                  name="축구/풋살"
                  emoji="⚽️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="농구"
                  emoji="🏀"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="야구"
                  emoji="⚾️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="배구"
                  emoji="🏐"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="복싱"
                  emoji="🥊"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="탁구"
                  emoji="🏓"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="배드민턴"
                  emoji="🏸"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="테니스/스쿼시"
                  emoji="🎾"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="태권도/유도"
                  emoji="🥋"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="검도"
                  emoji="⚔️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="무술/주짓수"
                  emoji="🥋"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="족구"
                  emoji="⚽️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="러닝"
                  emoji="🏃"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="자전거"
                  emoji="🚴"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="등산"
                  emoji="🏔️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="클라이밍"
                  emoji="🧗‍♀️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="수영"
                  emoji="🏊‍♀️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="골프"
                  emoji="⛳️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="요가/필라테스"
                  emoji="🧘"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="헬스/크로스핏"
                  emoji="🏋️"
                  onChange={onChange}
                  register={register}
                />
                <Tag
                  name="스케이트/인라인"
                  emoji="⛸️"
                  onChange={onChange}
                  register={register}
                />
              </fieldset>
            </TagContainer>
          </InfoBlock>
        </PersonalInfo>
        <span>
          <Button type="submit">
            <i className="fa-solid fa-square-check" />
            저장하기
          </Button>
          <TempButton to={`/members/mypage/${id}`}>
            <i className="fa-solid fa-xmark" />
            취소하기
          </TempButton>
        </span>
      </Container>
    </EditContainer>
  );
};

export default EditUser;
