import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import GPSCheck from '../utils/GPSCheck';
import styled from 'styled-components';
import Tag from '../components/Tag';

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
  tags: string; //문자열이 담긴 배열
  profile: string;
}

const SignUpContainer = styled.div`
  background-color: var(--gray);
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

  label,
  input,
  select,
  fieldset {
    width: 400px;
    height: 30px;
    border-radius: 5px;
    border: none;
  }

  input,
  select {
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
    }
  }

  #map {
    width: 500px;
    height: 400px;
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
          {/* {GPSCheck()}
          <div id="map"></div>
          <button type="button" onClick={getCurrentPosBtn()}>
            내 위치 가져오기
          </button> */}
          <fieldset>
            <legend>관심 운동 태그</legend>
            <div>
              <Tag name="축구/풋살" emoji="⚽️" />
              <Tag name="농구" emoji="🏀" />
              <Tag name="야구" emoji="⚾️" />
              <Tag name="배구" emoji="🏐" />
              <Tag name="복싱" emoji="🥊" />
              <Tag name="탁구" emoji="🏓" />
              <Tag name="배드민턴" emoji="🏸" />
              <Tag name="테니스/스쿼시" emoji="🎾" />
              <Tag name="태권도/유도" emoji="🥋" />
              <Tag name="검도" emoji="⚔️" />
              <Tag name="무술/주짓수" emoji="🥋" />
              <Tag name="족구" emoji="⚽️" />
              <Tag name="러닝" emoji="🏃" />
              <Tag name="자전거" emoji="🚴" />
              <Tag name="등산" emoji="🏔️" />
              <Tag name="클라이밍" emoji="🧗‍♀️" />
              <Tag name="수영" emoji="🏊‍♀️" />
              <Tag name="골프" emoji="⛳️" />
              <Tag name="요가/필라테스" emoji="🧘" />
              <Tag name="헬스/크로스핏" emoji="🏋️" />
              <Tag name="스케이트/인라인" emoji="⛸️" />
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
