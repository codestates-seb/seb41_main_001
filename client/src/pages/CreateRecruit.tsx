import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import TagAutoComplete from '../components/TagAutoComplete';

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

  > div:not(:nth-child(2)) {
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
`;

const CreateRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
  const [filterTag, setFilterTag] = useState('');

  return (
    <CRContainer>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>모집 게시글 생성</div>
        <label htmlFor="tag">태그</label>
        <TagAutoComplete filterTag={filterTag} setFilterTag={setFilterTag} />
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: true })}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          className="length"
          {...register('content', { required: true })}
        />
        <label htmlFor="date">모임 일시</label>
        <input
          id="date"
          type="datetime-local"
          {...register('date', { required: true })}
        />
        <label htmlFor="quota">모임 인원</label>
        <input
          id="quota"
          type="number"
          {...register('quota', { required: true })}
        />
        <label htmlFor="location">모임 장소</label>
        <input
          id="location"
          type="text"
          {...register('location', { required: true })}
        />
        <label htmlFor="genderCondition">성별 조건</label>
        <select id="genderCondition" {...register('genderCondition')}>
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
        <label htmlFor="ageCondition">나이대 조건</label>
        <input
          type="range"
          name="age"
          id="ageCondition"
          min="10"
          max="60"
          step="10"
        />
        <output name="x" htmlFor="ageCondition" />
        <label htmlFor="heartRateCondition">심박수 조건</label>
        <input
          id="heartRateCondition"
          type="range"
          {...register('heartRateCondition')}
        />
        <label htmlFor="image">이미지</label>
        <input id="image" type="file" {...register('image')} />
        <button type="submit">작성하기</button>
      </CRForm>
    </CRContainer>
  );
};

export default CreateRecruit;
