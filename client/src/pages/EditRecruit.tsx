import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';
// import RecruitDataProps from '../interfaces/RecruitDataProps';

enum GenderEnum {
  Female = '여성',
  Male = '남성',
  Both = '성별 무관',
}

enum AgeEnum {
  teenage = 10,
  twenties = 20,
  thirties = 30,
  forties = 40,
  fifties = 50,
  sixties = 60,
}

interface IFormInput {
  tag: string;
  title: string;
  content: string;
  date: string;
  require: number;
  minRequire: number;
  genderCondition: GenderEnum;
  ageCondition: AgeEnum;
  heartRateCondition: number;
  location: string;
  // image: string;
}

const ERContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
`;

const ERForm = styled.form`
  width: 35rem;
  height: auto;
  border: 0.05rem solid white;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1.7rem;
  margin-bottom: 1.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* div:first-child {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  } */

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;

    input,
    textarea {
      width: 15rem;
      margin: 0.5rem;
      outline: none;
      border: none;
      background-color: rgba(1, 1, 1, 0);
      border-bottom: 0.1rem solid grey;
      color: white;
      &:focus-within {
        border-bottom: 0.1rem solid white;
      }
    }

    label {
      width: 5rem;
    }

    .length {
      /* height: 5rem; */
      /* height: auto; */
      max-height: 10rem;
      width: 15rem;
    }
  }

  .warn {
    color: var(--neon-yellow);
  }

  button {
    width: 6rem;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 0.2rem;
    margin: 0.3rem;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-in-out;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      background-color: var(--neon-yellow);
      color: black;
      transition: 0.2s ease-in-out;
    }
  }
`;

const MapContainer = styled.div`
  margin-left: 4rem;
  > div {
    width: 20rem;
    height: 20rem;
  }
`;

const EditRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();
  const { location: currentLocation } = useCurrentLocation();
  const { recruitId } = useParams();
  // const [recruitData, setRecruitData] = useState<RecruitDataProps[]>([]);
  const onSubmit = (data: IFormInput) => {
    axios
      .patch(`/recruits/${recruitId}`, {
        ...data,
        location: {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        },
      })
      .then((res) => {
        console.log(res);
        navigate(`/recruits/${recruitId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`/recruits/${recruitId}`)
  //     .then((res) => {
  //       setRecruitData(res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <ERContainer>
      <ERForm onSubmit={handleSubmit(onSubmit)}>
        <h1>모집 게시글 수정</h1>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            // value={recruitData.title}
            {...register('title', { required: '제목을 입력하세요' })}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="length"
            // value={recruitData.body}
            {...register('content', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="date">모임 일시</label>
          <input
            id="date"
            type="datetime-local"
            // value={recruitData.date}
            {...register('date', { required: true })}
          />
        </div>
        <MapContainer>
          <label htmlFor="location">모임 장소</label>
          {/* <input
            id="location"
            type="text"
            {...register('location', { required: true })}
          /> */}
          <div className="mapClick">
            {/* {recruitData && (
              <KakaoMapClick
                latitude={recruitData.location.latitude}
                longitude={recruitData.location.longitude}
              />
            )} */}
            {currentLocation && (
              <KakaoMapClick
                latitude={currentLocation.latitude}
                longitude={currentLocation.longitude}
              />
            )}
          </div>
        </MapContainer>
        {/* <div>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div> */}
        <div className="warn">
          모임 일시, 모임 장소는 모임원들과 충분한 상의 후 변경하세요
        </div>
        <Button onClick={() => {}} value="수정하기" type="submit" />
      </ERForm>
    </ERContainer>
  );
};

export default EditRecruit;
