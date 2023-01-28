import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
// import Tag from '../components/Tag';
import AutoCompleteForArray from '../components/AutoCompleteForArray';
import KakaoMap from '../components/KakaoMap';
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
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
  font-size: 1rem;
`;

const SignUpForm = styled.form`
  width: 35rem;
  height: auto;
  padding: 1rem;
  margin-top: 1.7rem;
  margin-bottom: 1.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.05rem solid white;
  border-radius: 1rem;

  .inputCon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin-bottom: 1rem;
    label,
    p {
      width: 6rem;
    }

    div {
      > div {
        margin-left: 0.5rem;
      }
      display: flex;
      flex-direction: column;
      input,
      select {
        margin-bottom: 0.5rem;
        width: 22rem;
        margin: 0.5rem;
        outline: none;
        border: none;
        background-color: rgba(1, 1, 1, 0);
        border-bottom: 0.1rem solid grey;
        color: white;
        &:focus-within {
          border-bottom: 0.1rem solid white;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0 20px var(--gray) inset;
          -webkit-text-fill-color: white;
          color: white;
        }
      }
    }
  }

  .withBtn {
    width: 35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin-bottom: 1rem;
    label,
    p {
      width: 6rem;
    }

    div {
      > div {
        margin-left: 0.5rem;
      }
      display: flex;
      flex-direction: column;
      input {
        margin-bottom: 0.5rem;
        width: 16rem;
        margin: 0.5rem;
        outline: none;
        border: none;
        background-color: rgba(1, 1, 1, 0);
        border-bottom: 0.1rem solid grey;
        color: white;
        &:focus-within {
          border-bottom: 0.1rem solid white;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0 20px var(--gray) inset;
          -webkit-text-fill-color: white;
          color: white;
        }
      }
    }
  }

  .mapCon {
    width: 30rem;
    height: 22rem;
    display: flex;
    margin-left: 1rem;
    margin-bottom: 1rem;
    > div {
      width: 22rem;
      height: 22rem;
      margin-left: 4.5rem;
    }
  }

  div:nth-child(11) {
    display: flex;
    /* margin-bottom: 1rem; */
    p {
      height: 95%;
      width: 6rem;
    }
    div {
      padding: 0.2rem;
    }
  }
`;

// const TagList = styled.div`
//   width: 22rem;
//   display: flex;
//   flex-wrap: wrap;
//   margin: 0.5rem;
// `;

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
  const [nicknameValue, setNicknameValue] = useState('');
  const [checkedNickname, setCheckedNickname] = useState(true);
  const [phoneValue, setPhoneValue] = useState('');
  const [checkedPhone, setCheckedPhone] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [checkedEmail, setCheckedEmail] = useState(true);

  const onSubmit = (data: IFormInput) => {
    delete data.passwordRetype;

    axios
      .post('/members/signup', {
        ...data,
        lat: currentLocation?.latitude,
        lon: currentLocation?.longitude,
        locations: '의정부시',
      })
      .then((res) => {
        // console.log(res);
        alert(res);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        console.log(
          JSON.stringify({
            ...data,
            lat: currentLocation?.latitude,
            lon: currentLocation?.longitude,
            locations: '경기도 의정부시',
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

  // console.log('render');
  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <div className="inputCon">
          <label htmlFor="name">이름</label>
          <div>
            <input id="name" {...register('name', { required: true })} />
            {errors.name && <div>이름을 입력하세요</div>}
          </div>
        </div>
        <div className="withBtn">
          <label htmlFor="nickname">닉네임</label>
          <div>
            <input
              id="nickname"
              {...register('nickname', { required: true })}
              onChange={(e) => {
                setNicknameValue(e.target.value);
              }}
            />
            {errors.nickname && <div>닉네임을 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get(`/members/signup/check-nickname/${nicknameValue}`)
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
        </div>
        <div className="inputCon">
          <label htmlFor="birth">생년월일</label>
          <div>
            <input
              id="birth"
              type="date"
              {...register('birth', { required: true })}
            />
            {errors.birth && <div>생년월일을 입력하세요</div>}
          </div>
        </div>
        <div className="inputCon">
          <label htmlFor="sex">성별</label>
          <div>
            <select id="sex" {...register('sex')}>
              <option value="Female">여성</option>
              <option value="Male">남성</option>
            </select>
            {errors.sex && <div>성별을 입력하세요</div>}
          </div>
        </div>
        <div className="withBtn">
          <label htmlFor="email">이메일</label>
          <div>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
            />
            {errors.email && <div>이메일을 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get(`/members/signup/check-email/${emailValue}`)
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
        </div>
        <div className="withBtn">
          <label htmlFor="phone">휴대폰 번호</label>
          <div>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: true })}
              onChange={(e) => {
                setPhoneValue(e.target.value);
              }}
            />
            {errors.phone && <div>휴대폰 번호를 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get(`/members/signup/check-phone/${phoneValue}`)
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
        </div>
        <div className="inputCon">
          <label htmlFor="password">비밀번호</label>
          <div>
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
            {errors.password && <div>비밀번호를 입력하세요</div>}
          </div>
        </div>
        <div className="inputCon">
          <label htmlFor="passwordRetype">비밀번호 확인</label>
          <div>
            <input
              id="passwordRetype"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
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
            {errors.passwordRetype && <div>비밀번호가 일치하지 않습니다.</div>}
          </div>
        </div>
        <div className="mapCon">
          <p>지역</p>
          <div>
            {currentLocation && (
              <KakaoMap
                latitude={currentLocation.latitude}
                longitude={currentLocation.longitude}
              />
            )}
          </div>
        </div>
        <div>
          {/* 11번째 */}
          <p>관심 태그</p>
          {/* <TagList>
            {TAG_DATA.map((el) => (
              <Tag
                key={el.tagId}
                tagId={el.tagId}
                tagName={el.tagName}
                emoji={el.tagEmoji}
                // disabled={disabled}
                fields={fields}
                append={append}
                remove={remove}
                control={control}
                register={register}
              />
            ))}
          </TagList> */}
          <AutoCompleteForArray
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            control={control}
            data={TAG_DATA}
            tagLength={3}
          />
        </div>
        {/* <div className="inputCon">
          <label htmlFor="profile">프로필 사진</label>
          <input id="profile" type="file" {...register('profile')} />
        </div> */}
        <Button
          onClick={() => {}}
          value="건강한 삶 시작하기"
          disabled={!checkedNickname && !checkedEmail && !checkedPhone}
          type="submit"
        />
      </SignUpForm>
    </SignUpContainer>
  );
};
export default SignUp;
