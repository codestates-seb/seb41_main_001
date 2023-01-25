import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import AutoCompleteForArray from '../components/AutoCompleteForArray';

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
  margin-top: 100px;
  height: 100%;
`;

const CRForm = styled.form`
  width: auto;
  height: auto;
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label,
  input,
  textarea,
  select {
    border-radius: 5px;
    border: none;
    width: 400px;
    height: 30px;
  }

  input,
  textarea,
  select {
    margin-bottom: 10px;
  }

  .length {
    height: 100px;
  }
`;

const CreateRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
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

  return (
    <CRContainer>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>모집 게시글 생성</div>
        <label htmlFor="tag">태그</label>
        <AutoCompleteForArray
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tagLimit={1}
          data={TAG_DATA}
        />
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
