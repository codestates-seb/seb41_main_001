import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import useCurrentLocation from '../utils/useCurrentLocation';
import TagAutoComplete from '../components/TagAutoComplete';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';
// import UseAutosizeTextArea from '../components/UseAutosaveTextArea';

enum GenderEnum {
  female = '여성',
  male = '남성',
  both = '성별 무관',
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
  require: number;
  minRequire: number;
  location: string;
  genderCondition: GenderEnum;
  ageCondition: AgeEnum;
  heartRateCondition: number;
  // image: string;
}

const CRContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
  font-size: 16px;
`;

const CRForm = styled.form`
  width: 35rem;
  height: auto;
  border: 0.05rem solid white;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1.7rem;
  margin-bottom: 1.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    label,
    p {
      width: 6rem;
    }
    input,
    textarea,
    select {
      /* margin-bottom: 0.5rem; */
      width: 15rem;
      /* margin: 0.5rem; */
      outline: none;
      border: none;
      background-color: rgba(1, 1, 1, 0);
      border-bottom: 0.1rem solid grey;
      color: white;
      &:focus-within {
        border-bottom: 0.1rem solid white;
      }
    }
  }
`;

const TagContainer = styled.div`
  > div {
    width: 15rem;
  }
`;

const MapContainer = styled.div`
  margin-left: 5rem;
  .mapClick {
    width: 20rem;
    height: 20rem;
  }
`;
const AgeContainer = styled.div`
  p {
    width: 6rem;
  }
  div {
    width: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      input {
        width: 5rem;
      }
      label {
        width: 5rem;
      }
    }
  }
`;

const HeartContainer = styled.div`
  > div {
    width: 15rem;
    input {
      width: 12rem;
      margin-right: 0.5rem;
    }
    span {
      width: 3rem;
    }
  }
`;

const CreateRecruit = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();
  const { location: currentLocation } = useCurrentLocation();
  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);
  const [filterTag, setFilterTag] = useState('');
  // const [filterTagId, setFilterTagId] = useState();
  const navigate = useNavigate();
  const onSubmit = (data: IFormInput) => {
    axios
      .post('/recruits', {
        ...data,
        location: {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        },
        recruitTagDtos: {
          // tagId: filterTagId,
          tagName: filterTag,
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/recruits');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [value, setValue] = useState(60);

  // const [warning, setWarning] = useState('');
  // const [content, setContent] = useState('');
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // UseAutosizeTextArea(textAreaRef.current, content);

  const handleChangeValue = (e: any) => {
    setValue(e.target.value);
  };
  // const handleChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const val = evt.target?.value;
  //   // if (val.length === 0) {
  //   //   setWarning('본문을 입력하세요');
  //   // } else {
  //   //   setWarning('');
  //   // }
  //   setContent(val);
  // };

  return (
    <CRContainer>
      <CRForm onSubmit={handleSubmit(onSubmit)}>
        <h1>모집 게시글 작성</h1>
        <TagContainer>
          <label htmlFor="tag">태그</label>
          <TagAutoComplete
            filterTag={filterTag}
            setFilterTag={setFilterTag}
            // {...register('tag', { required: true })}
          />
        </TagContainer>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: true })}
          />
          {errors.title && <div>제목을 입력하세요</div>}
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea id="content" {...register('content', { required: true })} />
          {/* <textarea
            {...register('content', {
              required: true,
            })}
            id="content"
            rows={1}
            onChange={handleChangeText}
            ref={textAreaRef}
            value={content}
            name="content"
          /> */}
          {errors.content && <div>내용을 입력하세요</div>}
        </div>
        <div>
          <label htmlFor="date">모임 일시</label>
          <input
            id="date"
            type="datetime-local"
            {...register('date', { required: true })}
          />
          {errors.date && <div>모임 일시를 입력하세요</div>}
        </div>
        <div>
          <label htmlFor="require">모임 인원</label>
          <input
            id="quota"
            type="number"
            min={1}
            {...register('require', { required: true })}
          />
          {errors.require && <div>모임 인원을 입력하세요</div>}
        </div>
        <div>
          <label htmlFor="minRequire">최소 인원</label>
          <input
            id="minRequire"
            type="number"
            min={1}
            placeholder="최소 인원이 충족돼야 모임 결성!"
            {...register('minRequire', {
              required: true,
              validate: {
                checkRequire: (minValue) => {
                  const { require } = getValues();
                  return (
                    // eslint-disable-next-line operator-linebreak
                    require >= minValue ||
                    '모임 인원은 최소 인원보다 크거나 같아야 합니다.'
                  );
                },
              },
            })}
          />
          {errors.minRequire && <div>최소 인원을 입력하세요</div>}
        </div>
        <MapContainer>
          <label htmlFor="location">모임 장소</label>
          <div className="mapClick">
            {currentLocation && (
              <KakaoMapClick
                latitude={currentLocation?.latitude}
                longitude={currentLocation?.longitude}
              />
            )}
          </div>
        </MapContainer>
        <div>
          <label htmlFor="genderCondition">성별 조건</label>
          <select id="genderCondition" {...register('genderCondition')}>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="both">성별 무관</option>
          </select>
          {errors.genderCondition && <div>성별 조건을 입력하세요</div>}
        </div>
        <AgeContainer>
          <p>나이대 조건</p>
          <div>
            <div>
              <input
                type="checkbox"
                id="teenage"
                // name="ageCondition"
                value="teenage"
                {...register('ageCondition')}
              />
              <label htmlFor="teenage">10대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="twenties"
                // name="ageCondition"
                value="twenties"
                {...register('ageCondition')}
              />
              <label htmlFor="twenties">20대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="thirties"
                // name="ageCondition"
                value="thirties"
                {...register('ageCondition')}
              />
              <label htmlFor="thirties">30대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="forties"
                // name="ageCondition"
                value="forties"
                {...register('ageCondition')}
              />
              <label htmlFor="forties">40대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="fifties"
                // name="ageCondition"
                value="fifties"
                {...register('ageCondition')}
              />
              <label htmlFor="fifties">50대</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sixties"
                // name="ageCondition"
                value="sixties"
                {...register('ageCondition')}
              />
              <label htmlFor="sixties">60대</label>
            </div>
          </div>
        </AgeContainer>
        <HeartContainer>
          <label htmlFor="heartRateCondition">심박수 조건</label>
          <div>
            <input
              id="heartRateCondition"
              type="range"
              min="0"
              max="200"
              step="10"
              value={value}
              onChange={handleChangeValue}
              {...(register('heartRateCondition'), { required: true })}
            />
            {errors.heartRateCondition && <div>심박수 조건을 입력하세요</div>}
            <span className="result">{value}</span>
          </div>
        </HeartContainer>
        {/* <div>
          <label htmlFor="image">이미지</label>
          <input id="image" type="file" {...register('image')} />
        </div> */}
        <Button onClick={() => {}} type="submit" value="작성하기" />
      </CRForm>
    </CRContainer>
  );
};

export default CreateRecruit;
