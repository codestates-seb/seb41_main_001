// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import React from 'react';
import Tag from '../components/Tag';
import KakaoMap from '../components/KakaoMap';
import useCurrentLocation from '../utils/useCurrentLocation';

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log('change', event.target.value);
};

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
  profile: string;
}

const SignUpContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;
`;

const SignUpForm = styled.form`
  /* width: 700px; */
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

  div:first-child {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;

    label,
    p {
      width: 6rem;
    }

    input,
    select {
      margin-bottom: 0.5rem;
      width: 20rem;
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

    #map {
      width: 20rem;
      height: 20rem;
    }
  }

  button {
    width: 9rem;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 0.2rem;
    margin: 0.3rem;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-in-out;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      background-color: var(--neon-yellow);
      color: black;
      transition: 0.2s ease-in-out;
    }
  }
`;

const TagList = styled.div`
  width: 20rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem;
`;

const SignUp = () => {
  const { register, watch, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  console.log(watch('tags'));
  const toggles = watch('tags', []);
  if (toggles.length > 3) {
    alert('최대 3개까지 선택');
    // 3개 이상부터는 체크가 안되게 하는 법.
  }

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <div>회원가입</div>
        <div>
          <label htmlFor="name">이름</label>
          <input id="name" {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" {...register('nickname', { required: true })} />
        </div>
        <div>
          <label htmlFor="birth">생년월일</label>
          <input
            id="birth"
            type="date"
            {...register('birth', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="gender">성별</label>
          <select id="gender" {...register('gender')}>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
        </div>
        <div />
        <div>
          <label htmlFor="phone">휴대폰 번호</label>
          <input
            id="phone"
            type="tel"
            {...register('phone', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="passwordRetype">비밀번호 확인</label>
          <input
            id="passwordRetype"
            type="password"
            {...register('passwordRetype', { required: true })}
          />
        </div>
        <div>
          <p>지역</p>
          <KakaoMap />
        </div>
        <div>
          <p>관심 태그</p>
          <TagList>
            <Tag
              name="축구/풋살"
              emoji="⚽️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="농구"
              emoji="🏀"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="야구"
              emoji="⚾️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="배구"
              emoji="🏐"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="복싱"
              emoji="🥊"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="탁구"
              emoji="🏓"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="배드민턴"
              emoji="🏸"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="테니스/스쿼시"
              emoji="🎾"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="태권도/유도"
              emoji="🥋"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="검도"
              emoji="⚔️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="무술/주짓수"
              emoji="🥋"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="족구"
              emoji="⚽️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="러닝"
              emoji="🏃"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="자전거"
              emoji="🚴"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="등산"
              emoji="🏔️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="클라이밍"
              emoji="🧗‍♀️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="수영"
              emoji="🏊‍♀️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="골프"
              emoji="⛳️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="요가/필라테스"
              emoji="🧘"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="헬스/크로스핏"
              emoji="🏋️"
              onChange={onChange}
              register={register}
            />
            <Tag
              name="스케이트/인라인"
              emoji="⛸️"
              onChange={onChange}
              register={register}
            />
          </TagList>
        </div>
        <div>
          <label htmlFor="profile">프로필 사진</label>
          <input id="profile" type="file" {...register('profile')} />
        </div>
        <button type="submit">건강한 삶 시작하기</button>
      </SignUpForm>
    </SignUpContainer>
  );
};
export default SignUp;
