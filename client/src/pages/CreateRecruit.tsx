// import { useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AutoCompleteForArray from '../components/AutoCompleteForArray';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';

const RecruitFormContainer = styled.main`
  margin-top: 100px;
  width: 700px;
  color: white;
  font-size: 16px;

  #kakao-map {
    width: 100%;
    height: 400px;
  }
`;

const RecruitForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > button:last-child {
    margin-bottom: 50px;
  }

  table {
    margin: 20px 0px;
    border-spacing: 20px 30px;
    tr {
      > td:nth-child(1) {
        white-space: nowrap;
        width: 160px;
      }
      > td:nth-child(2) {
        width: 100%;
        position: relative;
      }
    }
    tr:nth-child(1),
    tr:nth-child(2),
    tr:nth-child(3),
    tr:nth-child(4),
    tr:nth-child(5),
    tr:nth-child(6),
    tr:nth-child(7) {
      input,
      textarea {
        padding: 5px;
        font-size: 16px;
        width: 100%;
        border: none;
        outline: 1px solid rgb(120, 120, 120);
        background-color: rgba(255, 255, 255, 0);
        color: white;
        &:focus {
          outline: 1px solid rgb(170, 170, 170);
        }
        &::placeholder {
          font-style: italic;
          font-size: 14px;
        }
      }
      textarea {
        height: 200px;
      }
    }
    tr:nth-child(5),
    tr:nth-child(6) {
      input {
        width: 100px;
        margin-right: 10px;
      }
    }
    tr:nth-child(9),
    tr:nth-child(10) {
      label {
        margin-right: 10px;
      }
    }
    tr:nth-child(11) {
      input {
        width: 300px;
        margin-right: 10px;
      }
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

interface RecruitFormInput {
  recruitTagDtos: { tagId: number; tagName: string; emoji: string }[];
  title: string;
  body: string;
  date: string;
  require: number;
  minRequire: number;
  location: string;
  lat: number;
  lon: number;
  sex: 'Both' | 'Male' | 'Female';
  ages: number[];
  heartLimit: number;
  // image: string;
  tagSearch: string;
}

const KakaoMapForClick = ({
  control,
  setValue,
  currentLat,
  currentLon,
}: any) => {
  const lat = useWatch({
    control,
    name: 'lat',
    defaultValue: currentLat,
  });
  const lon = useWatch({
    control,
    name: 'lon',
    defaultValue: currentLon,
  });
  console.log(lat, lon);
  return <KakaoMapClick latitude={lat} longitude={lon} setValue={setValue} />;
};

const CreateRecruit = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RecruitFormInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recruitTagDtos',
    rules: {
      validate: {
        moreThanOneTag: (values) =>
          values.length > 0 ? true : '태그는 1개 이상 선택해야 합니다',
      },
    },
  });

  const onSubmit = (data: RecruitFormInput) => {
    // tagSearch는 postBody에서 제외함.
    const { tagSearch, ...postBody } = data;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/recruits`,
        {
          memberId: localStorage.getItem('memberId'),
          ...postBody,
        },
        {
          headers: {
            Authorization: localStorage.getItem('AccessToken'),
            Refresh: localStorage.getItem('RefreshToken'),
          },
        },
      )
      .then((res) => {
        console.log(res);
        navigate(`/recruits`);
      })
      .catch((err) => console.log(err));
  };
  const { location } = useCurrentLocation();
  console.log(location);
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

  return (
    <RecruitFormContainer>
      <h1>모집 게시글 작성하기</h1>
      <span>직접 모임을 만들어 보세요!</span>

      <RecruitForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>태그</td>
              <td>
                <AutoCompleteForArray
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  control={control}
                  data={TAG_DATA}
                  tagLength={1}
                />
                <ErrorMessage>
                  {errors?.recruitTagDtos?.root?.message}
                </ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="title">제목</label>
              </td>
              <td>
                <input
                  id="title"
                  type="text"
                  {...register('title', {
                    required: '제목은 필수항목입니다',
                  })}
                />
                <ErrorMessage>{errors?.title?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="body">내용</label>
              </td>
              <td>
                <textarea
                  id="body"
                  {...register('body', { required: '내용은 필수항목입니다' })}
                />
                <ErrorMessage>{errors?.body?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="date">모임 일시</label>
              </td>
              <td>
                <input
                  id="date"
                  type="datetime-local"
                  {...register('date', {
                    required: '모임 일시는 필수항목입니다',
                  })}
                />
                <ErrorMessage>{errors?.date?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="require">총 모집 인원</label>
              </td>
              <td>
                <input
                  id="require"
                  type="number"
                  {...register('require', {
                    required: '총 모집 인원은 필수항목입니다',
                    valueAsNumber: true,
                  })}
                />
                명<ErrorMessage>{errors?.require?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="minRequire">모임의 최소충족인원</label>
              </td>
              <td>
                <input
                  id="minRequire"
                  type="number"
                  {...register('minRequire', {
                    required: '최소충족인원은 필수항목입니다',
                    valueAsNumber: true,
                    validate: {
                      smallerThanRequire: (value) =>
                        value > getValues().require
                          ? '최소모집인원은 총 모집인원 이하여야 합니다'
                          : true,
                    },
                  })}
                />
                명<ErrorMessage>{errors?.minRequire?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="location">모임 장소</label>
              </td>
              <td>
                <input
                  id="location"
                  type="text"
                  placeholder="예) 000카페, 00교 다리 위 중간 엘리베이터 앞"
                  {...register('location', {
                    required: '모임 장소는 필수항목입니다',
                  })}
                />
                <ErrorMessage>{errors?.location?.message}</ErrorMessage>
              </td>
            </tr>
            <tr className="mapCon">
              <td>
                <label htmlFor="latlon">카카오맵</label>
              </td>
              <td>
                {/* <div className="mapClick">
                  <KakaoMapClick
                    latitude={latlon.latitude}
                    longitude={latlon.longitude}
                  />
                </div> */}
                {location && (
                  <KakaoMapForClick
                    control={control}
                    setValue={setValue}
                    currentLat={location.latitude}
                    currentLon={location.longitude}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>성별 조건</td>
              <td>
                {['Both', 'Male', 'Female'].map((item) => (
                  <label key={item} htmlFor={`field-${item}`}>
                    <input
                      {...register('sex', {
                        required: '성별 조건은 필수항목입니다',
                      })}
                      type="radio"
                      value={item}
                      id={`field-${item}`}
                      name="sex"
                    />
                    {item === 'Both' ? '성별무관' : ''}
                    {item === 'Male' ? '남성만' : ''}
                    {item === 'Female' ? '여성만' : ''}
                  </label>
                ))}
                <ErrorMessage>{errors?.sex?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>나이대 조건</td>
              <td>
                {[10, 20, 30, 40, 50, 60, 70].map((el) => (
                  <label>
                    <input
                      key={el}
                      type="checkbox"
                      value={el}
                      {...register('ages', {
                        required: '나이대 조건은 필수항목입니다',
                      })}
                    />
                    {`${el}대`}
                  </label>
                ))}
                <ErrorMessage>{errors?.ages?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="heartLimit">심박수 조건</label>
              </td>
              <td>
                <Controller
                  control={control}
                  name="heartLimit"
                  defaultValue={50}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <input
                        id="heartLimit"
                        type="range"
                        min={0}
                        max={200}
                        step={10}
                        value={value}
                        {...register('heartLimit', {
                          required: true,
                          valueAsNumber: true,
                        })}
                        onChange={onChange}
                      />
                      <span className="result">현재 심박수 조건 {value}</span>
                    </>
                  )}
                />
              </td>
            </tr>
            {/* <tr>
              <td>
                <label htmlFor="image">이미지</label>
              </td>
              <td>
                <input id="image" type="file" {...register('image')} />
              </td>
            </tr> */}
          </tbody>
        </table>
        <Button
          value="글 작성하기"
          onClick={handleSubmit(onSubmit)}
          type="submit"
        />
      </RecruitForm>
    </RecruitFormContainer>
  );
};

export default CreateRecruit;
