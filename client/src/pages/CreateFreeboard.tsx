import { useFieldArray, useForm } from 'react-hook-form';
// import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditFreeAuto from '../components/EditFreeAuto';
// import UseAutosizeTextArea from '../components/UseAutosaveTextArea';

interface FormInputFree {
  category: '질문' | '정보' | '나눔' | '운동';
  title: string;
  content: string;
  // image: string;
  location: string;
  tag: { tagId: number; tagName: string }[];
  memberTags: {
    tagId: number;
    tagName: string;
    emoji: string;
  }[];
}

// interface TagForm {
//   tagId: number;
//   categoryExercise: boolean;
//   tagName: string;
//   // "emoji":
//   recruitCount: number;
//   freeCount: number;
// }

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
  width: 27rem;
  height: auto;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px 50px 30px 50px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tagContainer {
    display: flex;
    flex-direction: column;
    width: 15rem;
    margin-left: 20px;
    > span {
      padding-top: 0.3rem;
      font-size: 12px;
      color: lightgrey;
    }
    input {
      width: 15rem;
    }
  }

  .input,
  textarea,
  select {
    // margin-bottom: 15px;
    background-color: var(--gray);
    padding: 5px;
    margin-left: 20px;
    font-size: 14px;
    border: none;
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

  input {
    background-color: var(--gray);
    padding: 5px;
    font-size: 14px;
    border: none;
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
    justify-content: flex-start;
    align-items: flex-start;
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
    control,
    formState: { errors },
  } = useForm<FormInputFree>();
  const navigate = useNavigate();
  // const [warning, setWarning] = useState('');
  // const [content, setContent] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  useEffect(() => {
    const getOriginalPost = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/tags/freeboards?page=1&size=100`)
        .then((res: any) => {
          setAddedTags(res.data.data);
          console.log(addedTags);
        })
        .catch((err: any) => console.log(err));
    };
    getOriginalPost();
  }, []);

  const onSubmit = (data: FormInputFree) => {
    const sendingTag = data.memberTags.map(({ tagId, tagName }) => ({
      tagId,
      tagName,
    }));
    console.log({
      freeTitle: data.title,
      freeBody: data.content,
      category: data.category,
      location: data.location,
      freeTagDtos: sendingTag,
      memberId: 1,
    });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/freeboards`,
        {
          freeTitle: data.title,
          freeBody: data.content,
          category: data.category,
          location: data.location,
          freeTagDtos: sendingTag,
          memberId: `${localStorage.getItem('memberId')}`,
          // 태그와 멤버아이디가 고정되어있음
          // tagList: tags.reduce((r, e) => {
          //   r.push({ tagId: e.tagId });
          //   return r;
          // }, []),
          // tag, image 서버에 추가되면 그냥 data로 넣으면 될듯
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        navigate('/freeboards');
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
    return false;
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'memberTags',
    rules: {
      validate: {
        moreThanOneTag: (values) =>
          values.length > 0 ? true : '태그는 1개 이상 선택해야 합니다',
      },
    },
  });
  const TAG_DATA = [
    { tagId: 1, tagName: '축구/풋살', emoji: '⚽️' },
    { tagId: 2, tagName: '농구', emoji: '🏀' },
    { tagId: 3, tagName: '야구', emoji: '⚾️' },
    { tagId: 4, tagName: '배구', emoji: '🏐' },
    { tagId: 5, tagName: '복싱', emoji: '🥊' },
    { tagId: 6, tagName: '탁구', emoji: '🏓' },
    { tagId: 7, tagName: '배드민턴', emoji: '🏸' },
    { tagId: 8, tagName: '테니스/스쿼시', emoji: '🎾' },
    { tagId: 9, tagName: '태권도/유도', emoji: '🥋' },
    { tagId: 10, tagName: '검도', emoji: '⚔️' },
    { tagId: 11, tagName: '무술/주짓수', emoji: '🥋' },
    { tagId: 12, tagName: '족구', emoji: '⚽️' },
    { tagId: 13, tagName: '러닝', emoji: '🏃' },
    { tagId: 14, tagName: '자전거', emoji: '🚴' },
    { tagId: 15, tagName: '등산', emoji: '🏔️' },
    { tagId: 16, tagName: '클라이밍', emoji: '🧗‍♀️' },
    { tagId: 17, tagName: '수영', emoji: '🏊‍♀️' },
    { tagId: 18, tagName: '골프', emoji: '⛳️' },
    { tagId: 19, tagName: '요가/필라테스', emoji: '🧘' },
    { tagId: 20, tagName: '헬스/크로스핏', emoji: '🏋️' },
    { tagId: 21, tagName: '스케이트/인라인', emoji: '⛸️' },
  ];
  // const addTag = (e: any) => {
  //   // e.target.value
  //   if (e.keyCode === 13) {
  //     for (let i = 0; i < addedTags.length; i += 1) {
  //       if (addedTags[i].tagName === e.target.value) {
  //         // 이미 존재하는 태그일 경우
  //         console.log('tag exist');
  //         return false;
  //       }
  //     }

  //     axios
  //       .post(`${process.env.REACT_APP_API_URL}/tags`, {
  //         tagName: e.target.value,
  //       })
  //       .then((res) => {
  //         // console.log(res);
  //         alert(res);
  //       })
  //       .catch((err) => {
  //         console.log('key error ', err);
  //       });
  //   }
  //   return false;
  // };
  return (
    <Background>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <div>자유 게시글 생성</div>
        <div>
          <label htmlFor="category">말머리</label>
          <div id="select-contanier">
            <select id="category" {...register('category', { required: true })}>
              <option value="질문">질문</option>
              <option value="정보">정보</option>
              <option value="운동">운동</option>
              <option value="나눔">나눔</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="title">제목</label>
          <WarnSet>
            <input
              id="title"
              type="text"
              className="input"
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
              rows={15}
              {...register('content', { required: true })}
            />
            {errors.content && (
              <span>
                <i className="fa-solid fa-circle-exclamation" />
                본문을 입력해주세요
              </span>
            )}
          </WarnSet>
        </div>
        <div>
          <label htmlFor="location">위치</label>
          <div className="tagContainer">
            <input id="location" type="text" {...register('location')} />
            <span>장소를 공유하고 싶을 경우 위치를 적어 주세요</span>
          </div>
        </div>
        <div>
          <label htmlFor="tag">태그</label>
          <div className="tagContainer">
            {/* <input id="tag" name="tag" onKeyUp={addTag} />
            <span>엔터키로 태그를 입력하세요</span> */}
            <EditFreeAuto
              fields={fields}
              append={append}
              remove={remove}
              // register={register}
              control={control}
              data={TAG_DATA}
              tagLength={3}
            />
          </div>
        </div>
        {/* <div>
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
          <button type="submit">작성하기</button>
          <Link to="/freeboards">
            <button type="button">취소하기</button>
          </Link>
        </ButtonContainer>
      </CRForm>
    </Background>
  );
};

export default CreateFreeboard;
