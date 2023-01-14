import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

enum CategoryEnum {
  question = '질문',
  info = '정보',
  exercise = '운동',
  showoff = '자랑',
  giveaway = '나눔',
}

interface FormInputFree {
  category: CategoryEnum;
  title: string;
  content: string;
  image: string;
  tag: string;
}

const Background = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  padding: 150px 100px;
  height: 100%;
`;

const CRForm = styled.form`
  width: auto;
  height: auto;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px 50px 30px 50px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input,
  textarea,
  select {
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 30px;
    background-color: none;
    margin-bottom: 30px;
    margin-left: 20px;
  }
  > div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    > label {
      width: 50px;
      text-align: right;
    }
  }
  .length {
    height: 300px;
  }

  > div:first-child {
    text-shadow: white 0 0 5px;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
  }
  > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  button {
    margin: 10px 30px;
    padding: 9px 15px;
    background-color: var(--gray);
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    &:hover {
      background-color: black;
    }
  }
`;

const EditFreeboard = () => {
  const { register, handleSubmit } = useForm<FormInputFree>();
  const onSubmit = (data: FormInputFree) => console.log(data);

  return (
    <Background>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>자유 게시글 수정</div>
        <div>
          <label htmlFor="category">말머리</label>
          <select id="category" {...register('category', { required: true })}>
            <option value="question">질문</option>
            <option value="info">정보</option>
            <option value="exercise">운동</option>
            <option value="giveaway">나눔</option>
            <option value="showoff">자랑</option>
          </select>
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
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div>
        <div>
          <label htmlFor="tag">태그</label>
          <input id="tag" {...register('tag', { required: true })} />
        </div>
        <ButtonContainer>
          <button type="submit">작성하기</button>
          <Link to="/freeboards">
            <button type="button">취소하기</button>
          </Link>
        </ButtonContainer>
      </CRForm>
    </Background>
  );
};

export default EditFreeboard;
