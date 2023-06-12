import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useWatch, Controller } from 'react-hook-form'; // Controller, useFieldArray
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import Loading from './Loading';

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
      > td:last-child {
        display: flex;
        img {
          width: 15rem;
          height: 15rem;
          /* margin-top: 1rem;
          margin-right: 1rem; */
        }
        button {
          /* margin-bottom: 10rem; */
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }

    .default {
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
        &:disabled {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      textarea {
        height: 200px;
      }
    }

    .require {
      input {
        width: 100px;
        margin-right: 10px;
      }
    }

    .check {
      label {
        margin-right: 10px;
      }
      input {
        /* &:disabled {
          color: rgba(0, 0, 0, 0.3);
        } */
      }
    }

    .heartCon {
      input {
        width: 300px;
        margin-right: 10px;
        /* &:disabled {
          background-color: rgba(0, 0, 0, 0.3);
        } */
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
  image: string;
  recruitImages: {
    recruitIdImage: number;
    recruitId: number;
    filePath: string;
  }[];
  // showImages: boolean;
  // tagSearch: string;
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
  return <KakaoMapClick latitude={lat} longitude={lon} setValue={setValue} />;
};

const EditRecruit = () => {
  const [recruitData, setRecruitData] = useState<RecruitDataProps | null>();
  const [tagData, setTagData] = useState([]);
  const { recruitId } = useParams();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = Number(useSelector((state: any) => state.memberId));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`)
      .then((res) => {
        console.log(res);
        setRecruitData(res.data.data);
        axios
          .get(`${process.env.REACT_APP_API_URL}/tags/recruits?page=1&size=100`)
          .then((response) => {
            setTagData(response.data.data);
            console.log(tagData);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RecruitFormInput>({});

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'recruitTagDtos',
  //   rules: {
  //     validate: {
  //       moreThanOneTag: (values) =>
  //         values.length > 0 ? true : '태그를 선택하세요',
  //     },
  //   },
  // });

  const [removeImages, setRemoveImages] = useState<string[]>([]);

  const removeImage = (filePath: string) => {
    setRecruitData((prevState: any) => ({
      // error
      ...(prevState || {}),
      recruitImages: (prevState?.recruitImages || []).filter(
        (el: any) => el.filePath !== filePath,
      ),
      showImages: false,
    }));
    setRemoveImages((prevImages) => [...prevImages, filePath]);
  };

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

  const onSubmit = (data: RecruitFormInput) => {
    const formData = new FormData();
    const variables = {
      ...data,
      memberId,
    };

    formData.append(
      'recruit',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );

    let requestURL = `${process.env.REACT_APP_API_URL}/recruits/${recruitId}`;

    if (removeImages.length > 0) {
      const queryString = `?removeImages=${removeImages
        .map((filePath) => filePath.split('/').pop())
        .join(',')}`;
      requestURL += queryString;
    }

    if (data.image) {
      for (let i = 0; i < data.image.length; i += 1) {
        formData.append('files', data.image[i]);
      }
    }

    axios
      .patch(requestURL, formData, {
        headers: {
          Authorization: `${accessToken}`,
          Refresh: `${refreshToken}`,
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

  return (
    <RecruitFormContainer>
      <h1>모집 게시글 수정하기</h1>
      <span>게시글을 수정해보세요!</span>
      {recruitData ? (
        <RecruitForm onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tbody>
              {/* <tr className="default">
                <td>태그</td>
                <td>
                  <AutoCompleteForArray
                    fields={fields}
                    append={append}
                    remove={remove}
                    register={register}
                    control={control}
                    data={tagData}
                    tagLength={1}
                  />
                  <ErrorMessage>
                    {errors?.recruitTagDtos?.root?.message}
                  </ErrorMessage>
                </td>
              </tr> */}
              <tr className="default">
                <td>
                  <label htmlFor="title">제목</label>
                </td>
                <td>
                  <input
                    id="title"
                    type="text"
                    defaultValue={recruitData.title}
                    {...register('title', {
                      required: '제목은 필수항목입니다',
                    })}
                  />
                  <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                </td>
              </tr>
              <tr className="default">
                <td>
                  <label htmlFor="body">내용</label>
                </td>
                <td>
                  <textarea
                    id="body"
                    defaultValue={recruitData.body}
                    {...register('body', { required: '내용은 필수항목입니다' })}
                  />
                  <ErrorMessage>{errors?.body?.message}</ErrorMessage>
                </td>
              </tr>
              <tr className="default">
                <td>
                  <label htmlFor="date">모임 일시</label>
                </td>
                <td>
                  <input
                    id="date"
                    type="datetime-local"
                    defaultValue={recruitData.date}
                    disabled={recruitData.applies.length > 0}
                    {...register('date', {})}
                  />
                  <ErrorMessage>{errors?.date?.message}</ErrorMessage>
                </td>
              </tr>
              <tr className="default require">
                <td>
                  <label htmlFor="require">총 모집 인원</label>
                </td>
                <td>
                  <input
                    id="require"
                    type="number"
                    defaultValue={recruitData.require}
                    disabled={recruitData.applies.length > 0}
                    {...register('require', {
                      valueAsNumber: true,
                    })}
                  />
                  명<ErrorMessage>{errors?.require?.message}</ErrorMessage>
                </td>
              </tr>
              <tr className="default require">
                <td>
                  <label htmlFor="minRequire">모임의 최소충족인원</label>
                </td>
                <td>
                  <input
                    id="minRequire"
                    type="number"
                    defaultValue={recruitData.minRequire}
                    disabled={recruitData.applies.length > 0}
                    {...register('minRequire', {
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
              <tr className="default">
                <td>
                  <label htmlFor="location">모임 장소</label>
                </td>
                <td>
                  <input
                    id="location"
                    type="text"
                    defaultValue={recruitData.location}
                    disabled={recruitData.applies.length > 0}
                    {...register('location', {})}
                  />
                  <ErrorMessage>{errors?.location?.message}</ErrorMessage>
                </td>
              </tr>
              {recruitData.applies.length === 0 && (
                <tr className="mapCon">
                  <td>
                    <label htmlFor="latlon">위치 정보</label>
                  </td>
                  <td>
                    {recruitData && (
                      <KakaoMapForClick
                        control={control}
                        setValue={setValue}
                        currentLat={recruitData.lat}
                        currentLon={recruitData.lon}
                      />
                    )}
                  </td>
                </tr>
              )}
              <tr className="check">
                <td>성별 조건</td>
                <td>
                  {['Both', 'Male', 'Female'].map((item) => (
                    <label key={item} htmlFor={`field-${item}`}>
                      <input
                        defaultChecked={recruitData.sex === item}
                        disabled={recruitData.applies.length > 0}
                        {...register('sex')}
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
              <tr className="check">
                <td>나이대 조건</td>
                <td>
                  {[10, 20, 30, 40, 50, 60, 70].map((el) => (
                    <label>
                      <input
                        defaultChecked={recruitData.ageGroup.includes(`${el}`)}
                        disabled={recruitData.applies.length > 0}
                        key={el}
                        type="checkbox"
                        value={el}
                        {...register('ages')}
                      />
                      {`${el}대`}
                    </label>
                  ))}
                  <ErrorMessage>{errors?.ages?.message}</ErrorMessage>
                </td>
              </tr>
              <tr className="heartCon">
                <td>
                  <label htmlFor="heart">심박수 조건</label>
                </td>
                <td>
                  <Controller
                    control={control}
                    name="heartLimit"
                    defaultValue={recruitData?.heartLimit}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <input
                          id="heartLimit"
                          type="range"
                          min={0}
                          max={200}
                          step={10}
                          value={value}
                          disabled={recruitData.applies.length > 0}
                          {...register('heartLimit', {
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
              <tr>
                <td>
                  <label htmlFor="image">이미지</label>
                </td>
                <td>
                  <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/jpg, image/png, image/svg"
                    multiple
                    {...register('image')}
                    onChange={handleImageChange}
                  />
                </td>
              </tr>
              {previewImages ? (
                <tr>
                  <td />
                  <td>
                    {previewImages.map((image, index) => (
                      <img src={image} alt={`Preview ${index + 1}`} />
                    ))}
                  </td>
                </tr>
              ) : (
                ''
              )}
              {recruitData.recruitImages.length > 0
                ? recruitData.recruitImages.map((el) => (
                    <tr>
                      <td />
                      <td>
                        <img src={el.filePath} alt="" />
                        <button
                          type="button"
                          onClick={() => {
                            removeImage(el.filePath);
                          }}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))
                : ''}
            </tbody>
          </table>
          <Button
            value="글 작성하기"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </RecruitForm>
      ) : (
        <Loading />
      )}
    </RecruitFormContainer>
  );
};

export default EditRecruit;
