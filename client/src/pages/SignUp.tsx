import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
// import Tag from '../components/Tag';
import AutoCompleteForArray from '../components/AutoCompleteForArray';
// import KakaoMap from '../components/KakaoMap';
// import KakaoMapAdd from '../components/KakaoMapAdd';
import AddMap from '../components/AddMap';
import useCurrentLocation from '../utils/useCurrentLocation';
import Button from '../components/Button';

enum GenderEnum {
  Female = '여성',
  Male = '남성',
}

interface IFormInput {
  name: string;
  nickname: string;
  birth: string;
  sex: GenderEnum;
  email: string;
  phone: string;
  password: string;
  passwordRetype?: string;
  memberTags: { tagId: number; tagName: string; emoji: string }[];
  locations: string;
  lat: number;
  lon: number;
  // profile: string;
}

const SignUpContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
  h1 {
    margin-top: 50px;
  }
`;

const SignUpForm = styled.form`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  > button:last-child {
    margin-bottom: 50px;
  }

  table {
    margin: 20px 0px;
    border-spacing: 20px 30px;
    tr {
      > td:nth-child(1) {
        white-space: nowrap;
        width: 50px;
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
    tr:nth-child(7),
    tr:nth-child(8) {
      input,
      select {
        padding: 5px;
        font-size: 16px;
        width: 100%;
        border: none;
        outline: 1px solid rgb(120, 120, 120);
        background-color: var(--gray);
        color: white;
        &:focus {
          outline: 1px solid rgb(170, 170, 170);
        }
        &::placeholder {
          font-style: italic;
          font-size: 14px;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0 20px var(--gray) inset;
          -webkit-text-fill-color: white;
          color: white;
        }
      }
    }
    tr:nth-child(2),
    tr:nth-child(5),
    tr:nth-child(6) {
      input {
        width: 370px;
        margin-right: 10px;
      }
    }
  }
  > button:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

const SignUp = () => {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
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
  const navigate = useNavigate();
  const { location: currentLocation } = useCurrentLocation();
  const [checkedNickname, setCheckedNickname] = useState(true);
  const [checkedPhone, setCheckedPhone] = useState(true);
  const [checkedEmail, setCheckedEmail] = useState(true);
  const [locationString, setLocationString] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const onSubmit = (data: IFormInput) => {
    delete data.passwordRetype;
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/members/signup`, {
        ...data,
        lat,
        lon,
        locations: locationString,
      })
      .then((res) => {
        console.log(res);
        // alert(res);
      })
      .catch((err) => {
        navigate('/login');
        console.log(err);
        alert(err);
        console.log(
          JSON.stringify({
            ...data,
            lat,
            lon,
            locations: locationString,
          }),
        );
      });
  };

  // console.log(watch('tags'));
  // const toggles = watch('tags', []);
  // const [disabled, setDisabled] = useState(false);
  // if (toggles.length > 3) {
  //   alert('최대 3개까지 선택');
  // }
  // useEffect(() => {
  //   if (toggles.length > 2) {
  //     setDisabled(true);
  //   }
  // }, [toggles]);

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

  console.log('render');

  return (
    <SignUpContainer>
      <h1>회원 가입</h1>
      <span>회원 가입 후 다양한 모임에 참여해보세요!</span>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">이름</label>
              </td>
              <td>
                <input
                  id="name"
                  {...register('name', { required: '이름을 입력하세요' })}
                />
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="nickname">닉네임</label>
              </td>
              <td>
                <input
                  id="nickname"
                  {...register('nickname', {
                    required: '닉네임을 입력하세요',
                  })}
                />
                <ErrorMessage>{errors?.nickname?.message}</ErrorMessage>
                <Button
                  value="중복 확인"
                  onClick={() => {
                    const { nickname } = getValues();
                    axios
                      .get(
                        `${process.env.REACT_APP_API_URL}/members/signup/check-nickname/${nickname}`,
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data === true) {
                          alert('사용 불가능한 닉네임입니다.');
                          setCheckedNickname(true);
                        } else {
                          alert('사용 가능한 닉네임입니다.');
                          setCheckedNickname(false);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="birth">생년월일</label>
              </td>
              <td>
                <input
                  id="birth"
                  type="date"
                  {...register('birth', { required: '생년월일을 입력하세요.' })}
                />
                <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="sex">성별</label>
              </td>
              <td>
                <select
                  id="sex"
                  {...register('sex', { required: '성별을 입력하세요.' })}
                >
                  <option value="Female">여성</option>
                  <option value="Male">남성</option>
                </select>
                <ErrorMessage>{errors?.sex?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">이메일</label>
              </td>
              <td>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: '이메일을 입력하세요.' })}
                />
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                <Button
                  value="중복 확인"
                  onClick={() => {
                    const { email } = getValues();
                    axios
                      .get(
                        `${process.env.REACT_APP_API_URL}/members/signup/check-email/${email}`,
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data !== true) {
                          alert('사용 가능한 이메일입니다.');
                          setCheckedEmail(false);
                        } else {
                          alert('사용 불가능한 이메일입니다.');
                          setCheckedEmail(true);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="phone">휴대폰 번호</label>
              </td>
              <td>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    required: '휴대폰 번호를 입력하세요.',
                    pattern: {
                      value: /^(010)-[0-9]{3,4}-[0-9]{4}$/,
                      message: '010-0000-0000 형식에 맞춰주세요.',
                    },
                  })}
                />
                <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
                <Button
                  value="중복 확인"
                  onClick={() => {
                    const { phone } = getValues();
                    axios
                      .get(
                        `${process.env.REACT_APP_API_URL}/members/signup/check-phone/${phone}`,
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data !== true) {
                          alert('사용 가능한 번호입니다.');
                          setCheckedPhone(true);
                        } else {
                          alert('사용 불가능한 번호입니다.');
                          setCheckedPhone(false);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">비밀번호</label>
              </td>
              <td>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                    minLength: {
                      value: 8,
                      message: '최소 8자 이상의 비밀번호를 입력해주세요.',
                    },
                    maxLength: {
                      value: 16,
                      message: '16자 이하의 비밀번호를 입력해주세요.',
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                      message: '영문, 숫자를 혼용하여 입력해주세요.',
                    },
                  })}
                />
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="passwordRetype">비밀번호 확인</label>
              </td>
              <td>
                <input
                  id="passwordRetype"
                  type="password"
                  {...register('passwordRetype', {
                    required: '비밀번호를 확인해주세요.',
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return (
                          password === value || '비밀번호가 일치하지 않습니다.'
                        );
                      },
                    },
                  })}
                />
                <ErrorMessage>{errors?.passwordRetype?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <p>지역</p>
              </td>
              <td>
                <div>
                  {/* {currentLocation && (
                    <KakaoMapAdd
                      latitude={currentLocation.latitude}
                      longitude={currentLocation.longitude}
                    />
                  )} */}
                  {currentLocation && (
                    <AddMap
                      latitude={currentLocation.latitude}
                      longitude={currentLocation.longitude}
                      locationString={locationString}
                      setLocationString={setLocationString}
                      setLat={setLat}
                      setLon={setLon}
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p>관심 태그</p>
              </td>
              <td>
                <AutoCompleteForArray
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  control={control}
                  data={TAG_DATA}
                  tagLength={3}
                />
              </td>
            </tr>
            {/* <tr>
            <td>
          <label htmlFor="profile">프로필 사진</label>
          <td>
          <td>
          <input id="profile" type="file" {...register('profile')} />
          </td>
        </tr> */}
            <Button
              onClick={() => {}}
              value="건강한 삶 시작하기"
              disabled={!checkedNickname && !checkedEmail && !checkedPhone}
              type="submit"
            />
          </tbody>
        </table>
      </SignUpForm>
    </SignUpContainer>
  );
};
export default SignUp;
