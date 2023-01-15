import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogInContainer = styled.div`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: auto;
`;

const LogInForm = styled.form`
  width: auto;
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

    input {
      width: 10rem;
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

  div:first-child {
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;

  button {
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
  }
`;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //   console.log(watch('Email'));

  return (
    <LogInContainer>
      <LogInForm
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <div>로그인</div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            {...register('email', { required: true })}
            defaultValue="abc@gmail.com"
          />
          {errors.email && <div>이메일을 입력하세요</div>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: true, maxLength: 10 })}
          />
          {errors.password && <div>비밀번호를 입력하세요</div>}
        </div>
        <ButtonContainer>
          <Link to="/search-password">
            <button type="button">비밀번호 찾기</button>
          </Link>
          <button type="submit">로그인</button>
          <Link to="/signup">
            <button type="button">회원가입</button>
          </Link>
        </ButtonContainer>
      </LogInForm>
    </LogInContainer>
  );
};
export default LogIn;
