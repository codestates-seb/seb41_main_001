import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import AutoCompleteForArray from '../components/AutoCompleteForArray';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';

enum GenderEnum {
  female = '여성',
  male = '남성',
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
  image: string;
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

  > div:first-child {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  > div:not(:nth-child(2), :nth-child(7)) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    margin: 0.5rem;
    margin-bottom: 1rem;

    label,
    p {
      width: 6rem;
    }

    .length {
      height: 5rem;
    }

    input,
    textarea,
    select {
      width: 15rem;
      outline: none;
      border: none;
      background-color: rgba(1, 1, 1, 0);
      border-bottom: 0.1rem solid grey;
      color: white;
      &:focus-within {
        border-bottom: 0.1rem solid white;
      }
    }

    > div {
      label {
        width: 3rem;
      }
      input {
        width: 1rem;
      }
      width: 8rem;
    }
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    width: 20rem;
    label {
      width: 6rem;
      white-space: nowrap;
      margin-right: 1.5rem;
    }
    > div {
      width: 100%;
      margin-bottom: 0.5rem;
      display: flex;
      input {
        height: auto;
      }
    }
  }

  > div:nth-child(7) {
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      width: 4rem;
      margin-right: 1rem;
    }
  }

  .submitBtn {
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

  .heartCon {
    width: 15rem;
    margin: 0.5rem;
    input {
      width: 13rem;
    }
  }

  .ageCon {
    width: 15rem;
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem;
    span {
      width: 5rem;
    }
  }

  .mapClick {
    width: 15rem;
    height: 15rem;
  }
`;

const CreateRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
  const [value, setValue] = useState(60);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedTag, setSelectedTag] = useState<
    { tagId: number; tagName: string; tagEmoji: string }[]
  >([]);

  const TAG_DATA = [
    { tagId: 1, tagName: '축구/풋살', tagEmoji: '⚽️' },
    { tagId: 2, tagName: '농구', tagEmoji: '🏀' },
    { tagId: 3, tagName: '야구', tagEmoji: '⚾️' },
    { tagId: 4, tagName: '배구', tagEmoji: '🏐' },
    { tagId: 5, tagName: '복싱', tagEmoji: '🥊' },
    { tagId: 6, tagName: '탁구', tagEmoji: '🏓' },
    { tagId: 7, tagName: '배드민턴', tagEmoji: '🏸' },
    { tagId: 8, tagName: '테니스/스쿼시', tagEmoji: '🎾' },
    { tagId: 9, tagName: '태권도/유도', tagEmoji: '🥋' },
    { tagId: 10, tagName: '검도', tagEmoji: '⚔️' },
    { tagId: 11, tagName: '무술/주짓수', tagEmoji: '🥋' },
    { tagId: 12, tagName: '족구', tagEmoji: '⚽️' },
    { tagId: 13, tagName: '러닝', tagEmoji: '🏃' },
    { tagId: 14, tagName: '자전거', tagEmoji: '🚴' },
    { tagId: 15, tagName: '등산', tagEmoji: '🏔️' },
    { tagId: 16, tagName: '클라이밍', tagEmoji: '🧗‍♀️' },
    { tagId: 17, tagName: '수영', tagEmoji: '🏊‍♀️' },
    { tagId: 18, tagName: '골프', tagEmoji: '⛳️' },
    { tagId: 19, tagName: '요가/필라테스', tagEmoji: '🧘' },
    { tagId: 20, tagName: '헬스/크로스핏', tagEmoji: '🏋️' },
    { tagId: 21, tagName: '스케이트/인라인', tagEmoji: '⛸️' },
  ];

  useCurrentLocation().then((res) => {
    if (res === undefined) return;
    setLocation(res);
  });

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <CRContainer>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>모집 게시글 작성</div>
        <div>
          <label htmlFor="tag">태그</label>
          <AutoCompleteForArray
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            tagLimit={1}
            data={TAG_DATA}
          />
        </div>
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
        <div className="mapCon">
          <label htmlFor="location">모임 장소</label>
          {/* <input
            id="location"
            type="text"
            {...register('location', { required: true })}
          /> */}
          <div className="mapClick">
            {location && (
              <KakaoMapClick
                latitude={location?.latitude}
                longitude={location?.longitude}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="genderCondition">성별 조건</label>
          <div>
            <input
              type="radio"
              id="female"
              name="genderCondition"
              value="여성"
            />
            <label htmlFor="female">여성</label>
          </div>
          <div>
            <input type="radio" id="male" name="genderCondition" value="남성" />
            <label htmlFor="male">남성</label>
          </div>
        </div>
        <div>
          <p>나이대 조건</p>
          <div className="ageCon">
            <span>
              <input
                type="checkbox"
                id="teenage"
                // name="ageCondition"
                value="teenage"
                {...register('ageCondition')}
              />
              <label htmlFor="teenage">10대</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="twenties"
                // name="ageCondition"
                value="twenties"
                {...register('ageCondition')}
              />
              <label htmlFor="twenties">20대</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="thirties"
                // name="ageCondition"
                value="thirties"
                {...register('ageCondition')}
              />
              <label htmlFor="thirties">30대</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="forties"
                // name="ageCondition"
                value="forties"
                {...register('ageCondition')}
              />
              <label htmlFor="forties">40대</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="fifties"
                // name="ageCondition"
                value="fifties"
                {...register('ageCondition')}
              />
              <label htmlFor="fifties">50대</label>
            </span>
            <span>
              <input
                type="checkbox"
                id="sixties"
                // name="ageCondition"
                value="sixties"
                {...register('ageCondition')}
              />
              <label htmlFor="sixties">60대</label>
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="heartRateCondition">심박수 조건</label>
          <div className="heartCon">
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
        </div>
        <div>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div>
        <button className="submitBtn" type="submit">
          작성하기
        </button>
      </CRForm>
    </CRContainer>
  );
};

export default CreateRecruit;
