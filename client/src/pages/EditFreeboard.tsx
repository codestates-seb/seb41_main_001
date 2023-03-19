import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FreeDataProps from '../interfaces/FreeDataProps';
import Loading from './Loading';

interface FormInputFree {
  category: '질문' | '정보' | '나눔' | '운동';
  freeTitle: string;
  freeBody: string;
  // memberId: number;
  // image: string;
  // tag: { tagId: number; tagName: string }[];
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
    border: 1px solid gray;
    width: 15rem;
    outline: none;
    color: white;
    &:focus-within {
      border: 2px solid white;
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

const EditFreeboard = () => {
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = useSelector((state: any) => state.memberId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputFree>();
  const navigate = useNavigate();
  // const [warning, setWarning] = useState('');
  // const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [posting, setPosting] = useState<FreeDataProps>({
    freeId: 1,
    category: '',
    freeBody: '',
    freeTitle: '',
    createdAt: '',
    modifiedAt: '',
    location: '',
    nickname: '',
    authorHeart: 0,
    views: 0,
    memberId: 1,
    freeLikes: [],
    freeTags: [],
    tagId: 1,
    tagName: '축구',
    freeComments: [],
    authorLocation: '',
    filePath: '',
    freeImages: [],
  });
  const { freeId } = useParams();
  useEffect(() => {
    const getOriginalPost = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/freeboards/${freeId}`, {
          // headers: {
          //   Authorization: `${localStorage.getItem('AccessToken')}`,
          //   Refresh: `${localStorage.getItem('RefreshToken')}`,
          // },
        })
        .then((res: any) => {
          setPosting(res.data.data);
          setIsLoading(false);
        })
        .catch((err: any) => console.log(err));
    };
    getOriginalPost();
  }, []);

  const onSubmit = (data: FormInputFree) => {
    // data.content = content;
    console.log('here is ', {
      ...data,
      memberId,
      // freeId: posting.freeId,
    });
    axios
      .patch(`${process.env.REACT_APP_API_URL}/freeboards/${freeId}`, {
        ...data,
        memberId,
        // tagList: tags.reduce((r, e) => {
        //   r.push({ tagId: e.tagId });
        //   return r;
        // }, []),
        // tag, image 서버에 추가되면 그냥 data로 넣으면 될듯
        headers: {
          Authorization: accessToken,
          Refresh: refreshToken,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/freeboards');
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  };
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // UseAutosizeTextArea(textAreaRef.current, content);

  // const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const val = evt.target?.value;
  //   if (val.length === 0) {
  //     setWarning('본문을 입력하세요');
  //   } else {
  //     setWarning('');
  //   }
  //   setContent(val);
  // };
  // const fileNums = (e:any) => {
  //   if (e.files.length > 2) {
  //     alert('file up to 2');
  //   } else {
  //     alert('alr we cool');
  //   }
  // };
  return (
    <Background>
      {!isLoading ? (
        <CRForm onSubmit={handleSubmit(onSubmit)}>
          <div>자유 게시글 수정</div>
          <div>
            <label htmlFor="category">말머리</label>
            <div id="select-contanier">
              <select
                id="category"
                defaultValue={posting.category}
                {...register('category', { required: true })}
              >
                <option value="질문">질문</option>
                <option value="정보">정보</option>
                <option value="운동">운동</option>
                <option value="나눔">나눔</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="freeTitle">제목</label>
            <WarnSet>
              <input
                id="freeTitle"
                type="text"
                defaultValue={posting.freeTitle}
                {...register('freeTitle', { required: true })}
              />
              {errors.freeTitle && (
                <span>
                  <i className="fa-solid fa-circle-exclamation" />
                  제목을 입력해주세요
                </span>
              )}
            </WarnSet>
          </div>
          <div>
            <label htmlFor="freeBody">내용</label>
            <WarnSet>
              <textarea
                id="freeBody"
                rows={15}
                // ref={textAreaRef}
                defaultValue={posting.freeBody}
                {...register('freeBody', { required: true })}
              />
              {errors.freeBody && (
                <span>
                  <i className="fa-solid fa-circle-exclamation" />
                  본문을 입력해주세요
                </span>
              )}
            </WarnSet>
          </div>
          {/* <div>
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
        </div> */}
          <ButtonContainer>
            <button type="submit">저장하기</button>
            <Link to="/freeboards">
              <button type="button">취소하기</button>
            </Link>
          </ButtonContainer>
        </CRForm>
      ) : (
        <Loading />
      )}
    </Background>
  );
};

export default EditFreeboard;
