import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

interface IFormInput {
  title: string;
  content: string;
  date: string;
  quota: number;
  location: string;
  image: string;
}

const ERContainer = styled.div`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const ERForm = styled.form`
  width: auto;
  height: auto;
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px;
  margin: 30px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
  }
`;

const EditRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <>
      <Header />
      <ERContainer>
        <ERForm onSubmit={handleSubmit(onSubmit)}>
          <div>모집 게시글 수정</div>
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
          <label>이미지</label>
          <input type="file" {...register('image')} />
          <button type="submit">수정하기</button>
        </ERForm>
      </ERContainer>
      <Footer />
    </>
  );
};

export default EditRecruit;
