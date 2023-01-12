import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Tag from '../components/Tag';
import KakaoMap from '../components/KakaoMap';

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
  tags: string; // 문자열이 담긴 배열
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
  width: 600px;
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
  .tagLabel {
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
      /* width: 500px; */
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  #map {
    width: 500px;
    height: 400px;
  }

  button {
    width: 170px;
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
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <div>회원가입</div>
        <label htmlFor="name">이름</label>
        <input id="name" {...register('name', { required: true })} />
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" {...register('nickname', { required: true })} />
        <label htmlFor="birth">생년월일</label>
        <input
          id="birth"
          type="date"
          {...register('birth', { required: true })}
        />
        <label htmlFor="gender">성별</label>
        <select id="gender" {...register('gender')}>
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: true })}
        />
        <label htmlFor="phone">휴대폰 번호</label>
        <input
          id="phone"
          type="tel"
          {...register('phone', { required: true })}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
        <label htmlFor="passwordRetype">비밀번호 확인</label>
        <input
          id="passwordRetype"
          type="password"
          {...register('passwordRetype', { required: true })}
        />
        <label htmlFor="location">지역</label>
        <KakaoMap />
        <fieldset>
          <legend className="tagLabel">관심 운동 태그</legend>
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
        <label htmlFor="profile">프로필 사진</label>
        <input id="profile" type="file" {...register('profile')} />
        <button type="submit">건강한 삶 시작하기</button>
      </SignUpForm>
    </SignUpContainer>
  );
};
export default SignUp;
