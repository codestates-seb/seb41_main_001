import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import Button from '../components/Button';
// import ButtonLink from '../components/ButtonLink';

const SPContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  /* height: 200%; */
  height: 24.32rem;
`;

const SPFormContainer = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 1rem 2rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  > div:first-child {
    font-size: 24px;
  }
  div {
    margin: 1rem 0;
    width: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      margin-right: 0.5rem;
    }
    input {
      width: 13rem;
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

const SearchPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <SPContainer>
      <SPFormContainer>
        <div>비밀번호 찾기</div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            value="임시 비밀번호 발송"
            onClick={() => {
              axios
                .post(`/members/find-account`, {
                  email,
                })
                .then((res) => {
                  console.log(res);
                  alert('비밀번호가 발송되었습니다.');
                })
                .catch((err) => {
                  console.log(err);
                  alert('이메일이 올바르지 않습니다.');
                });
            }}
          />
          {/* <ButtonLink value="로그인" to="/login" /> */}
        </div>
      </SPFormContainer>
    </SPContainer>
  );
};

export default SearchPassword;
