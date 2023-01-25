import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import useCurrentLocation from '../utils/useCurrentLocation';
import TagAutoComplete from '../components/TagAutoComplete';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';

enum GenderEnum {
  female = '여성',
  male = '남성',
  both = '성별 무관',
}

enum AgeEnum {
  teenage = '10대',
  twenties = '20대',
  thirties = '30대',
  forties = '40대',
  fifties = '50대',
  sixties = '60대',
}

interface IFormInput {
  tag: string;
  title: string;
  content: string;
  date: string;
  quota: number;
  location: string;
  genderCondition: GenderEnum;
  ageCondition: AgeEnum;
  heartRateCondition: number;
  // image: string;
}

const CRContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
  font-size: 16px;
`;

const CRForm = styled.form`
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

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    label,
    p {
      width: 6rem;
    }
    input,
    textarea,
    select {
      margin-bottom: 0.5rem;
      width: 15rem;
      /* margin: 0.5rem; */
      outline: none;
      border: none;
      background-color: rgba(1, 1, 1, 0);
      border-bottom: 0.1rem solid grey;
      color: white;
      &:focus-within {
        border-bottom: 0.1rem solid white;
      }
    }
  }
`;

const TagContainer = styled.div`
  > div {
    width: 15rem;
  }
`;

const MapContainer = styled.div`
  .mapClick {
    width: 15rem;
    height: 15rem;
  }
`;
const AgeContainer = styled.div`
  p {
    width: 6rem;
  }
  div {
    width: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      input {
        width: 5rem;
      }
      label {
        width: 5rem;
      }
    }
  }
`;

const HeartContainer = styled.div`
  > div {
    width: 15rem;
    input {
      width: 12rem;
      margin-right: 0.5rem;
    }
    span {
      width: 3rem;
    }
  }
`;

const CreateRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
  const [value, setValue] = useState(60);
  const { location: currentLocation } = useCurrentLocation();
  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const [filterTag, setFilterTag] = useState('');

  return (
    <CRContainer>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <h1>모집 게시글 작성</h1>
        <TagContainer>
          <label htmlFor="tag">태그</label>
          <TagAutoComplete
            filterTag={filterTag}
            setFilterTag={setFilterTag}
            {...register('tag', { required: true })}
          />
        </TagContainer>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="length"
            {...register('content', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="date">모임 일시</label>
          <input
            id="date"
            type="datetime-local"
            {...register('date', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="quota">모임 인원</label>
          <input
            id="quota"
            type="number"
            {...register('quota', { required: true })}
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
            {currentLocation && (
              <KakaoMapClick
                latitude={currentLocation?.latitude}
                longitude={currentLocation?.longitude}
              />
            )}
          </div>
        </MapContainer>
        <div>
          <label htmlFor="genderCondition">성별 조건</label>
          <select id="gender" {...register('genderCondition')}>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="both">성별 무관</option>
          </select>
        </div>
        <AgeContainer>
          <p>나이대 조건</p>
          <div>
            <div>
              <input
                type="checkbox"
                id="teenage"
                // name="ageCondition"
                value="teenage"
                {...register('ageCondition')}
              />
              <label htmlFor="teenage">10대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="twenties"
                // name="ageCondition"
                value="twenties"
                {...register('ageCondition')}
              />
              <label htmlFor="twenties">20대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="thirties"
                // name="ageCondition"
                value="thirties"
                {...register('ageCondition')}
              />
              <label htmlFor="thirties">30대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="forties"
                // name="ageCondition"
                value="forties"
                {...register('ageCondition')}
              />
              <label htmlFor="forties">40대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="fifties"
                // name="ageCondition"
                value="fifties"
                {...register('ageCondition')}
              />
              <label htmlFor="fifties">50대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sixties"
                // name="ageCondition"
                value="sixties"
                {...register('ageCondition')}
              />
              <label htmlFor="sixties">60대</label>
            </div>
          </div>
        </AgeContainer>
        <HeartContainer>
          <label htmlFor="heartRateCondition">심박수 조건</label>
          <div>
            <input
              id="heartRateCondition"
              type="range"
              min="0"
              max="200"
              step="10"
              value={value}
              onChange={handleChange}
              {...(register('heartRateCondition'), { required: true })}
            />
            <span className="result">{value}</span>
          </div>
        </HeartContainer>
        {/* <div>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div> */}
        <Button onClick={() => {}} type="submit" value="작성하기" />
      </CRForm>
    </CRContainer>
  );
};

export default CreateRecruit;
