import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {
  // useSelector,
  useDispatch,
} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setMemberId,
  setBirth,
  setHeart,
  setSex,
} from '../redux/actions';
import ButtonLink from '../components/ButtonLink';
import Button from '../components/Button';

const LogInContainer = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

const LogInForm = styled.form`
  margin: 40px 0px 20px 0px;
  width: 500px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 20px;
  font-size: 16px;
  table {
    border-spacing: 5px 30px;
    tr {
      td:nth-child(1) {
        width: 100px;
        white-space: nowrap;
      }
      td:nth-child(2) {
        width: 200px;
        position: relative;
      }
    }
  }

  input {
    width: 100%;
    padding: 5px;
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
  > button {
    height: 100px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 10px;
  }
`;

interface LoginProps {
  email: string;
  password: string;
}

const LogIn = () => {
  const dispatch = useDispatch();
  // const accessToken = useSelector((state: any) => state.accessToken);
  // const refreshToken = useSelector((state: any) => state.refreshToken);
  // const memberId = useSelector((state: any) => state.memberId);
  // const birth = useSelector((state: any) => state.birth);
  // const heart = useSelector((state: any) => state.heart);
  // const sex = useSelector((state: any) => state.sex);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/members/login`, data)
      .then((res) => {
        console.log(res);
        dispatch(setAccessToken(res.headers.authorization!));
        dispatch(setRefreshToken(res.headers.refresh!));
        dispatch(setMemberId(res.headers['member-id']!));
        dispatch(setHeart(res.headers.heart!));
        dispatch(setBirth(res.headers.birth!));
        dispatch(setSex(res.headers.sex!));
        // localStorage.setItem('AccessToken', res.headers.authorization!);
        // localStorage.setItem('RefreshToken', res.headers.refresh!);
        // localStorage.setItem('memberId', res.headers['member-id']!);
        // localStorage.setItem('birth', res.headers.birth!);
        // localStorage.setItem('heart', res.headers.heart!);
        // localStorage.setItem('sex', res.headers.sex!);
        // 로컬스토리지 말고 스토어에 저장하기
        navigate('/');
        // setToken(res.headers.authorization);
        // window.location.reload();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        console.log(err);

        if (errMsg === '존재하지 않는 회원') {
          setError('email', {
            type: 'server',
            message: '가입된 이메일이 아닙니다',
          });
        }
        if (errMsg === '잘못된 패스워드 입력') {
          setError('password', {
            type: 'server',
            message: '비밀번호가 일치하지 않습니다',
          });
        }
      });
  };

  return (
    <LogInContainer>
      <h1>로그인</h1>
      <LogInForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">이메일</label>
              </td>
              <td>
                <input
                  id="email"
                  {...register('email', { required: '이메일을 입력하세요' })}
                />
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
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
                    required: '비밀번호를 입력하세요',
                    maxLength: 16,
                  })}
                />
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit" onClick={handleSubmit(onSubmit)} value="로그인" />
      </LogInForm>
      <ButtonContainer>
        <ButtonLink value="비밀번호 찾기" to="/search-password" />
        <ButtonLink value="회원가입" to="/signup" />
      </ButtonContainer>
    </LogInContainer>
  );
};
export default LogIn;
