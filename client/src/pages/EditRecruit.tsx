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
  width: 800px;
  height: auto;
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div:first-child {
    margin-top: 20px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    input,
    textarea {
      width: 300px;
      margin: 10px;
      outline: none;
      border: none;
      background-color: rgba(1, 1, 1, 0);
      border-bottom: 2px solid grey;
      color: white;
      &:focus-within {
        border-bottom: 2px solid white;
      }
    }

    label {
      width: 100px;
    }

    .length {
      height: 100px;
    }
  }

  .warn {
    color: var(--neon-yellow);
  }

  button {
    width: 130px;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 8px 14px;
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

const EditRecruit = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <ERContainer>
      <ERForm onSubmit={handleSubmit(onSubmit)}>
        <div>모집 게시글 수정</div>
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
          <label htmlFor="location">모임 장소</label>
          <input
            id="location"
            type="text"
            {...register('location', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div>
        <div className="warn">
          모임 일시, 모임 장소는 모임원들과 충분한 상의 후 변경하세요
        </div>
        <button type="submit">수정하기</button>
      </ERForm>
    </ERContainer>
  );
};

export default EditRecruit;
