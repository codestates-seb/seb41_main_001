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
    .select-container {
      position:relative;
      select {
        display:none;
      }
    }
  }
  .length {
    height: 300px;
  }
  input[type='file'] {
    display: none;
  }
  .imagebutton {
    border: 2px solid white;
    margin-left: 25px;
    width: 180px;
    border-radius: 10px;
    margin-bottom: 30px;
    text-align: center;
    padding: 5px 10px;
    &:hover {
      background-color: black;
    }
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

const CreateFreeboard = () => {
  const { register, handleSubmit } = useForm<FormInputFree>();
  const onSubmit = (data: FormInputFree) => console.log(data);

  // const fileNums = (e:any) => {
  //   if (e.files.length > 2) {
  //     alert('file up to 2');
  //   } else {
  //     alert('alr we cool');
  //   }
  // };
  return (
    <Background>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>자유 게시글 생성</div>
        <div>
          <label htmlFor="category">말머리</label>
          <div id="select-contanier">
            <select id="category" {...register('category', { required: true })}>
              <option value="question">질문</option>
              <option value="info">정보</option>
              <option value="exercise">운동</option>
              <option value="giveaway">나눔</option>
              <option value="showoff">자랑</option>
            </select>
          </div>
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
          <div>이미지</div>
          <label htmlFor="image" className="imagebutton">
            + 이미지 파일 추가
          </label>
          <input
            id="image"
            type="file"
            accept="image/jpeg,image/jpg, image/png, image/svg"
            multiple
            {...register('image')}
          />
        </div>
        <div>
          <label htmlFor="tag">태그</label>
          <input id="tag" {...register('tag', { required: true })} />
        </div>
        <ButtonContainer>
          <button type="submit">작성하기</button>
          <Link to="/freeboard">
            <button type="button">취소하기</button>
          </Link>
        </ButtonContainer>
      </CRForm>
    </Background>
  );
};

export default CreateFreeboard;
