import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
// import ButtonLink from '../components/ButtonLink';

const SPContainer = styled.main`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  height: 100vh;
`;

const SPFormContainer = styled.form`
  border: 1px solid rgb(170, 170, 170);
  border-radius: 1rem;
  padding: 20px 40px;
  width: 400px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    > div {
      position: relative;
      margin-bottom: 30px;
      &:nth-child(2) {
        width: 100%;
      }
    }
    label {
      white-space: nowrap;
      margin-right: 20px;
    }
    input {
      padding: 5px;
      width: 100%;
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
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

const SearchPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ email: string }>();

  const onSubmit = (data: { email: string }) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/members/find-account`, data)
      .then((res) => {
        console.log(res);
        alert('비밀번호가 발송되었습니다.');
      })
      .catch((err) => {
        const errMsg = err.response.data.message;

        if (errMsg === '존재하지 않는 회원') {
          setError('email', {
            type: 'server',
            message: '가입된 이메일이 아닙니다',
          });
        }
      });
  };

  return (
    <SPContainer>
      <h2>비밀번호 찾기</h2>
      <SPFormContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="email">이메일</label>
          </div>
          <div>
            <input
              id="email"
              {...register('email', { required: '이메일을 입력하세요' })}
            />
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </div>
        </div>
        <div>
          <Button
            value="임시 비밀번호 발송"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
          {/* <ButtonLink value="로그인" to="/login" /> */}
        </div>
      </SPFormContainer>
    </SPContainer>
  );
};

export default SearchPassword;
