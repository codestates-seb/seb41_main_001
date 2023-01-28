import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ButtonLink from '../components/ButtonLink';
import Button from '../components/Button';

const LogInContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: auto;
`;

const LogInForm = styled.form`
<<<<<<< HEAD
  width: 25rem;
=======
  width: auto;
>>>>>>> b8277dc1be2d3c19a8a5ce3d998ab0bf96ae042e
  height: 50%;
  padding: 1rem;
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.05rem solid white;
  border-radius: 1rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      width: 4rem;
    }

    div {
      display: flex;
      flex-direction: column;
      input {
        width: 14rem;
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
<<<<<<< HEAD
=======

  div:first-child {
    margin-bottom: 1rem;
    font-weight: bold;
  }
>>>>>>> b8277dc1be2d3c19a8a5ce3d998ab0bf96ae042e
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  button {
<<<<<<< HEAD
    margin-left: 0.6rem;
  }
  a:nth-child(2) {
    margin-right: 2rem;
=======
    width: 7rem;
    text-decoration: none;
    background-color: var(--gray);
    color: white;
    border-radius: 0.3rem;
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
>>>>>>> b8277dc1be2d3c19a8a5ce3d998ab0bf96ae042e
  }
`;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <LogInContainer>
      <LogInForm
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
<<<<<<< HEAD
        <h1>로그인</h1>
=======
        <div>로그인</div>
>>>>>>> b8277dc1be2d3c19a8a5ce3d998ab0bf96ae042e
        <div>
          <label htmlFor="email">이메일</label>
          <div>
            <input
              id="email"
              {...register('email', { required: true })}
              defaultValue="abc@gmail.com"
            />
            {errors.email && <div>이메일을 입력하세요</div>}
          </div>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <div>
            <input
              id="password"
              type="password"
              {...register('password', { required: true, maxLength: 10 })}
            />
            {errors.password && <div>비밀번호를 입력하세요</div>}
          </div>
        </div>
        <ButtonContainer>
          <ButtonLink value="비밀번호 찾기" to="/search-password" />
          <Button type="submit" onClick={() => {}} value="로그인" />
          <ButtonLink value="회원가입" to="/signup" />
        </ButtonContainer>
      </LogInForm>
    </LogInContainer>
  );
};
export default LogIn;
