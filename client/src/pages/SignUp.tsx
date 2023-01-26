import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import Tag from '../components/Tag';
import KakaoMap from '../components/KakaoMap';
import useCurrentLocation from '../utils/useCurrentLocation';
import Button from '../components/Button';

enum GenderEnum {
  female = '여성',
  male = '남성',
}

interface IFormInput {
  name: string;
  nickname: string;
  birth: string;
  gender: GenderEnum;
  email: string;
  phone: string;
  password: string;
  passwordRetype: string;
  tags: [];
  location: object;
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

const TagList = styled.div`
  width: 22rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem;
`;

const SignUp = () => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const navigate = useNavigate();
  const { location: currentLocation } = useCurrentLocation();
  const [checkedNickname, setCheckedNickname] = useState(false);
  const [checkedPhone, setCheckedPhone] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);

  const onSubmit = (data: IFormInput) => {
    axios
      .post('/members/signup', {
        ...data,
        location: {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        },
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
            location: {
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
            },
          }),
        );
      });
  };

  // console.log(watch('tags'));
  const toggles = watch('tags', []);
  const [disabled, setDisabled] = useState(false);
  // if (toggles.length > 3) {
  //   alert('최대 3개까지 선택');
  // }
  useEffect(() => {
    if (toggles.length > 2) {
      setDisabled(true);
    }
  }, [toggles]);

  const TAG_DATA = [
    { tagId: 1, tagName: '축구/풋살', tagEmoji: '⚽️' },
    { tagId: 2, tagName: '농구', tagEmoji: '🏀' },
    { tagId: 3, tagName: '야구', tagEmoji: '⚾️' },
    { tagId: 4, tagName: '배구', tagEmoji: '🏐' },
    { tagId: 5, tagName: '복싱', tagEmoji: '🥊' },
    { tagId: 6, tagName: '탁구', tagEmoji: '🏓' },
    { tagId: 7, tagName: '배드민턴', tagEmoji: '🏸' },
    { tagId: 8, tagName: '테니스/스쿼시', tagEmoji: '🎾' },
    { tagId: 9, tagName: '태권도/유도', tagEmoji: '🥋' },
    { tagId: 10, tagName: '검도', tagEmoji: '⚔️' },
    { tagId: 11, tagName: '무술/주짓수', tagEmoji: '🥋' },
    { tagId: 12, tagName: '족구', tagEmoji: '⚽️' },
    { tagId: 13, tagName: '러닝', tagEmoji: '🏃' },
    { tagId: 14, tagName: '자전거', tagEmoji: '🚴' },
    { tagId: 15, tagName: '등산', tagEmoji: '🏔️' },
    { tagId: 16, tagName: '클라이밍', tagEmoji: '🧗‍♀️' },
    { tagId: 17, tagName: '수영', tagEmoji: '🏊‍♀️' },
    { tagId: 18, tagName: '골프', tagEmoji: '⛳️' },
    { tagId: 19, tagName: '요가/필라테스', tagEmoji: '🧘' },
    { tagId: 20, tagName: '헬스/크로스핏', tagEmoji: '🏋️' },
    { tagId: 21, tagName: '스케이트/인라인', tagEmoji: '⛸️' },
  ];

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
            />
            {errors.nickname && <div>닉네임을 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get('/members/signup/check-nickname/{nickname}')
                .then((res) => {
                  console.log(res);
                  if (res.data === true) {
                    alert('사용 가능한 닉네임입니다.');
                    setCheckedNickname(true);
                  } else {
                    alert('사용 불가능한 닉네임입니다.');
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
          <label htmlFor="gender">성별</label>
          <div>
            <select id="gender" {...register('gender')}>
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
            {errors.gender && <div>성별을 입력하세요</div>}
          </div>
        </div>
        <div className="withBtn">
          <label htmlFor="email">이메일</label>
          <div>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && <div>이메일을 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get('/members/signup/check-email/{email}')
                .then((res) => {
                  console.log(res);
                  if (res.data !== true) {
                    alert('사용 불가능한 이메일입니다.');
                    setCheckedEmail(true);
                  } else {
                    alert('사용 가능한 이메일입니다.');
                    setCheckedEmail(false);
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
            />
            {errors.phone && <div>휴대폰 번호를 입력하세요</div>}
          </div>
          <Button
            value="중복 확인"
            onClick={() => {
              axios
                .get('/members/signup/check-phone/{phone}')
                .then((res) => {
                  console.log(res);
                  if (res.data === true) {
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
            {errors.passwordRetype && <div>비밀번호 확인을 입력하세요</div>}
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
          <TagList>
            {TAG_DATA.map((el) => (
              <Tag
                key={el.tagId}
                name={el.tagName}
                emoji={el.tagEmoji}
                disabled={disabled}
                register={register}
              />
            ))}
          </TagList>
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
