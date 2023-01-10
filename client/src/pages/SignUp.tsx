// import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  name: string;
  nickname: string;
  birth: string; //
  gender: GenderEnum;
  email: string;
  phone: string; //
  password: string;
  tags: string;
  profile: string; //
}

const SignUpContainer = styled.div`
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100%;
`;

const SignUpForm = styled.form`
  width: 400px;
  height: auto;
  padding: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  border: 1px solid white;
  border-radius: 10px;

  button {
    width: 200px;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 8px 14px;
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

const SignUp = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpForm
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
        >
          <div>회원가입</div>
          <label>이름</label>
          <input {...register('name', { required: true })} />
          <label>닉네임</label>
          <input {...register('nickname', { required: true })} />
          <label>생년월일</label>
          <input {...register('birth', { required: true })} />
          <label>성별</label>
          <select {...register('gender')}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <label>이름</label>
          <input {...register('name', { required: true })} />
          <label>비밀번호</label>
          <input {...register('password', { required: true })} />
          <label>관심 운동 태그</label>
          <input {...register('tags')} />
          <button type="submit">건강한 삶 시작하기</button>
        </SignUpForm>
      </SignUpContainer>
      <Footer />
    </>
  );
};
export default SignUp;
