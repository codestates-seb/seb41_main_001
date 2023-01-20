import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IFormInput {
  title: string;
  content: string;
  date: string;
  location: string;
  image: string;
}

const ERContainer = styled.div`
  background-color: var(--gray);
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
  align-items: center;

  label,
  input,
  textarea {
    width: 400px;
    height: 30px;
    border-radius: 5px;
    border: none;
  }

  input,
  textarea,
  .warn {
    margin-bottom: 10px;
  }

  input:nth-child(1) {
    height: 100px;
  }

  .length {
    height: 100px;
  }

  .warn {
    color: var(--neon-yellow);
  }
`;

const EditRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <ERContainer>
      <ERForm onSubmit={handleSubmit(onSubmit)}>
        <div>모집 게시글 수정</div>
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
        <label htmlFor="location">모임 장소</label>
        <input
          id="location"
          type="text"
          {...register('location', { required: true })}
        />
        <label htmlFor="image">이미지</label>
        <input id="image" type="file" {...register('image')} />
        <div className="warn">
          모임 일시, 모임 장소는 모임원들과 충분한 상의 후 변경하세요
        </div>
        <button type="submit">수정하기</button>
      </ERForm>
    </ERContainer>
  );
};

export default EditRecruit;
