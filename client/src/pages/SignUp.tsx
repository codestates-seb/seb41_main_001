import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

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
  tags: string;
  profile: string;
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
  width: auto;
  height: auto;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  label,
  input,
  select,
  fieldset {
    width: 400px;
    height: 30px;
    border-radius: 5px;
    border: none;
  }

  input {
    margin-bottom: 10px;
  }

  fieldset {
    width: 100%;
    height: auto;
    div {
      width: 450px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: 1px solid white;
        border-radius: 5px;
        width: auto;
        margin: 5px;
        padding: 5px;

        input {
          width: 20px;
          height: 20px;
          margin-top: 5px;
        }

        label {
          width: 100px;
          height: 20px;
          font-size: 13px;
          margin-bottom: 5px;
        }
      }
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
        <SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <div>회원가입</div>
          <label>이름</label>
          <input {...register('name', { required: true })} />
          <label>닉네임</label>
          <input {...register('nickname', { required: true })} />
          <label>생년월일</label>
          <input type="date" {...register('birth', { required: true })} />
          <label>성별</label>
          <select {...register('gender')}>
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
          <label>이메일</label>
          <input type="email" {...register('email', { required: true })} />
          <label>휴대폰 번호</label>
          <input type="tel" {...register('phone', { required: true })} />
          <label>비밀번호</label>
          <input
            type="password"
            {...register('password', {
              required: true,
            })}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            {...register('passwordRetype', { required: true })}
          />
          <fieldset>
            <legend>관심 운동 태그</legend>
            <div>
              <span>
                <input
                  type="checkbox"
                  id="축구/풋살"
                  name="tags"
                  value="축구/풋살"
                />
                <label htmlFor="축구/풋살">축구/풋살⚽️</label>
              </span>
              <span>
                <input type="checkbox" id="농구" name="tags" value="농구" />
                <label htmlFor="농구">농구🏀</label>
              </span>
              <span>
                <input type="checkbox" id="야구" name="tags" value="야구" />
                <label htmlFor="야구">야구⚾️</label>
              </span>
              <span>
                <input type="checkbox" id="배구" name="tags" value="배구" />
                <label htmlFor="배구">배구🏐</label>
              </span>
              <span>
                <input type="checkbox" id="복싱" name="tags" value="복싱" />
                <label htmlFor="복싱">복싱🥊</label>
              </span>
              <span>
                <input type="checkbox" id="탁구" name="tags" value="탁구" />
                <label htmlFor="탁구">탁구🏓</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="배드민턴"
                  name="tags"
                  value="배드민턴"
                />
                <label htmlFor="배드민턴">배드민턴🏸</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="테니스/스쿼시"
                  name="tags"
                  value="테니스/스쿼시"
                />
                <label htmlFor="테니스/스쿼시">테니스/스쿼시🎾</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="태권도/유도"
                  name="tags"
                  value="태권도/유도"
                />
                <label htmlFor="태권도/유도">태권도/유도🥋</label>
              </span>
              <span>
                <input type="checkbox" id="검도" name="tags" value="검도" />
                <label htmlFor="검도">검도⚔️</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="무술/주짓수"
                  name="tags"
                  value="무술/주짓수"
                />
                <label htmlFor="무술/주짓수">무술/주짓수🥋</label>
              </span>
              <span>
                <input type="checkbox" id="족구" name="tags" value="족구" />
                <label htmlFor="족구">족구⚽️</label>
              </span>
              <span>
                <input type="checkbox" id="러닝" name="tags" value="러닝" />
                <label htmlFor="러닝">러닝🏃</label>
              </span>
              <span>
                <input type="checkbox" id="자전거" name="tags" value="자전거" />
                <label htmlFor="자전거">자전거🚴</label>
              </span>
              <span>
                <input type="checkbox" id="등산" name="tags" value="등산" />
                <label htmlFor="등산">등산🏔️</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="클라이밍"
                  name="tags"
                  value="클라이밍"
                />
                <label htmlFor="클라이밍">클라이밍🧗‍♀️</label>
              </span>
              <span>
                <input type="checkbox" id="수영" name="tags" value="수영" />
                <label htmlFor="수영">수영🏊‍♀️</label>
              </span>
              <span>
                <input type="checkbox" id="골프" name="tags" value="골프" />
                <label htmlFor="골프">골프⛳️</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="요가/필라테스"
                  name="tags"
                  value="요가/필라테스"
                />
                <label htmlFor="요가/필라테스">요가/필라테스🧘</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="헬스/크로스핏"
                  name="tags"
                  value="헬스/크로스핏"
                />
                <label htmlFor="헬스/크로스핏">헬스/크로스핏🏋️</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="스케이트/인라인"
                  name="tags"
                  value="스케이트/인라인"
                />
                <label htmlFor="스케이트/인라인">스케이트/인라인⛸️</label>
              </span>
            </div>
          </fieldset>
          <label>프로필 사진</label>
          <input type="file" {...register('profile')} />
          <button type="submit">건강한 삶 시작하기</button>
        </SignUpForm>
      </SignUpContainer>
      <Footer />
    </>
  );
};
export default SignUp;
