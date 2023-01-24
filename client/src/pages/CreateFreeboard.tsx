import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseAutosizeTextArea from '../components/UseAutosaveTextArea';

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

const WarnSet = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    color: var(--neon-red);
    font-size: 10px;
    padding: 0.5rem 0;
    margin-left: 1.2rem;
    > i {
      margin-right: 0.3rem;
    }
  }
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
    // margin-bottom: 15px;
    background-color: var(--gray);
    padding: 5px;
    margin-left: 20px;
    font-size: 14px;
    border: none;
    border-bottom: 2px solid gray;
    width: 15rem;
    outline: none;
    color: white;
    &:focus-within {
      border-bottom: 2px solid white;
      transition: 0.2s ease-in-out;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 20px var(--gray) inset;
      -webkit-text-fill-color: white;
      color: white;
    }
  }

  > div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1.2rem;
    > label,
    .label {
      width: 50px;
      text-align: right;
      padding-top: 5px;
      text-shadow: white 0 0 3px;
    }
    .label {
      padding-top: 5px;
    }
    .select-container {
      position: relative;
      select {
        display: none;
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
    margin-top: 5px;
    text-align: center;
    padding: 5px 10px;
    &:hover {
      background-color: var(--neon-yellow);
      color: black;
      border: 2px solid var(--neon-yellow);
      transition: 0.2s ease-in-out;
      cursor: pointer;
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
  > label,
  .label {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin: 0px 30px 10px 30px;
    padding: 9px 15px;
    background-color: var(--gray);
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    &:hover {
      background-color: var(--neon-yellow);
      color: black;
      border: 2px solid var(--neon-yellow);
      transition: 0.2s ease-in-out;
      cursor: pointer;
    }
  }
`;

const CreateFreeboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputFree>();
  const navigate = useNavigate();
  const [warning, setWarning] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = (data: FormInputFree) => {
    data.content = content;
    console.log(data);
    if (!data.content || data.content.length === 0) {
      setWarning('본문을 입력하세요');
    } else {
      axios
        .post('/freeboards', {
          freeTitle: data.title,
          freeBody: data.content,
          category: data.category,
          // tagList: tags.reduce((r, e) => {
          //   r.push({ tagId: e.tagId });
          //   return r;
          // }, []),
          // tag, image 서버에 추가되면 그냥 data로 넣으면 될듯
        })
        .then((res) => {
          console.log(res);
          navigate('/freeboard');
        })
        .catch((err) => {
          console.log(err);
          navigate('/login');
        });
    }
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  UseAutosizeTextArea(textAreaRef.current, content);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    if (val.length === 0) {
      setWarning('본문을 입력하세요');
    } else {
      setWarning('');
    }
    setContent(val);
  };
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
          <WarnSet>
            <input
              id="title"
              type="text"
              {...register('title', { required: true })}
            />
            {errors.title && (
              <span>
                <i className="fa-solid fa-circle-exclamation" />
                제목을 입력해주세요
              </span>
            )}
          </WarnSet>
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <WarnSet>
            <textarea
              id="content"
              rows={1}
              onChange={handleChange}
              ref={textAreaRef}
              value={content}
              name="content"
              // {...register('content', { required: true })}
            />
            {warning !== '' && (
              <span>
                <i className="fa-solid fa-circle-exclamation" />
                {warning}
              </span>
            )}
          </WarnSet>
        </div>
        <div>
          <label htmlFor="tag">태그</label>
          <input id="tag" {...register('tag')} />
        </div>
        <div>
          <div className="label">이미지</div>
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
