import { useFieldArray, useForm } from 'react-hook-form';
// import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditFreeAuto from '../components/EditFreeAuto';
// import UseAutosizeTextArea from '../components/UseAutosaveTextArea';

interface FormInputFree {
  category: '질문' | '정보' | '나눔' | '운동';
  title: string;
  content: string;
  image: any;
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

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8.5rem;
  img {
    width: 10rem;
    height: 10rem;
  }
`;

const CreateFreeboard = () => {
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = useSelector((state: any) => state.memberId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputFree>();
  const navigate = useNavigate();
  const [addedTags, setAddedTags] = useState([]);

  useEffect(() => {
    const getOriginalPost = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/tags/freeboards?page=1&size=100`)
        .then((res: any) => {
          setAddedTags(res.data.data);
        })
        .catch((err: any) => console.log(err));
    };
    getOriginalPost();
  }, []);

  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (event: any) => {
    const { files } = event.target;
    const images: any = [];

    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader();

      reader.onload = (e) => {
        images.push(e.target!.result);
        if (images.length === files.length) {
          setPreviewImages(images);
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const onSubmit = (data: FormInputFree) => {
    const sendingTag = data.memberTags.map(({ tagName, emoji }) => ({
      tagName,
      emoji,
    }));

    const variables = {
      freeTitle: data.title,
      freeBody: data.content,
      category: data.category,
      location: data.location,
      freeTagDtos: sendingTag,
      memberId,
    };

    const formData = new FormData();
    if (data.image.length > 0) {
      for (let i = 0; i < data.image.length; i += 1) {
        formData.append('files', data.image[i]);
      }
    }
    formData.append(
      'free',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );

    axios
      .post(`${process.env.REACT_APP_API_URL}/freeboards`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
  const TAG_DATA = addedTags.map(({ tagId, tagName, emoji }) => ({
    tagId,
    tagName,
    emoji,
  }));

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
              tagLength={5}
            />
            <span>스페이스바/버튼 선택으로 태그를 입력하세요</span>
          </div>
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
            onChange={handleImageChange}
          />
        </div>
        <PreviewContainer>
          {previewImages.map((image, index) => (
            <img src={image} alt={`Preview ${index + 1}`} />
          ))}
        </PreviewContainer>
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
