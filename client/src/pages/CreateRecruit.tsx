import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

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
  background-color: grey;
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

  input,
  select {
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    width: 400px;
    height: 30px;
  }
`;

const CreateRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <>
      <Header />
      <CRContainer>
        <CRForm onSubmit={handleSubmit(onSubmit)}>
          <div>모집 게시글 생성</div>
          <label>태그</label>
          <input {...register('tag', { required: true })} />
          <label>제목</label>
          <input type="text" {...register('title', { required: true })} />
          <label>내용</label>
          <input type="text" {...register('content', { required: true })} />
          <label>모임 일시</label>
          <input
            type="datetime-local"
            {...register('date', { required: true })}
          />
          <label>모임 인원</label>
          <input type="number" {...register('quota', { required: true })} />
          <label>모임 장소</label>
          <input type="text" {...register('location', { required: true })} />
          <label>성별 조건</label>
          <select {...register('genderCondition')}>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
          <label>나이대 조건</label>
          <input
            type="range"
            name="age"
            id="ageCondition"
            min="10"
            max="60"
            step="10"
          ></input>
          <output name="x" htmlFor="ageCondition"></output>
          <label>심박수 조건</label>
          <input type="range" {...register('heartRateCondition')} />
          <label>이미지</label>
          <input type="file" {...register('image')} />
          <button type="submit">작성하기</button>
        </CRForm>
      </CRContainer>
      <Footer />
    </>
  );
};

export default CreateRecruit;
