import { useState } from 'react';
import styled from 'styled-components';

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 8px;
  > label:first-child {
    width: 120px;
    display: flex;
    align-items: flex-start;
    text-shadow: white 0 0 5px;
    margin-right: 30px;
    margin-top: 5px;
    margin-left: 20px;
  }
  > button {
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    padding: 0 0.5rem;
    background-color: var(--gray);
    margin: 0 2rem;
    &:hover {
      transition: 0.2s ease-in-out;
      text-shadow: white 0 0 5px;
      background-color: var(--neon-yellow);
      color: black;
      border: 1px solid var(--neon-yellow);
      cursor: pointer;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
      margin: 5px 5px 0px 0;
      font-size: 15px;
      > i {
        color: white;
        font-size: 16px;
        margin-left: 15px;
        &:hover {
          color: var(--neon-red);
          text-shadow: white 0 0 2px;
          transition: 0.2s ease-in-out;
          cursor: pointer;
        }
      }
    }
  }
`;

const WarnSet = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    color: var(--neon-red);
    font-size: 10px;
    padding: 0.5rem 0;
    margin-left: 0.2rem;
    > i {
      margin-right: 0.3rem;
    }
  }
`;

const NewPassword = ({
  passwordMatch,
  doesMatch,
  doesNotMatch,
  newPass,
  setNewPass,
}: any) => {
  const [condition, setCondition] = useState(false);
  const handleChange = (event: any) => {
    // 👇 Get input value from "event"
    const testing = /^(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
    if (testing.test(event.target.value)) {
      setNewPass(event.target.value);
      setCondition(true);
    } else {
      setCondition(false);
    }
    doesNotMatch();
  };
  const handleMatch = (event: any) => {
    if (newPass === event.target.value) {
      doesMatch();
    } else {
      doesNotMatch();
    }
  };
  return (
    <div>
      <InfoBlock>
        <label htmlFor="newPassword">새 비밀번호</label>
        <WarnSet>
          <input
            id="newPassword"
            type="password"
            className="input"
            onChange={handleChange}
          />
          {condition ? (
            ''
          ) : (
            <span>
              <i className="fa-solid fa-circle-exclamation" />
              비밀번호는 8자 이상, 영문과 숫자 혼용이어야 합니다
            </span>
          )}
        </WarnSet>
      </InfoBlock>
      <InfoBlock>
        <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
        <WarnSet>
          <input
            id="newPasswordCheck"
            type="password"
            className="input"
            onChange={handleMatch}
          />
          {passwordMatch ? (
            ''
          ) : (
            <span>
              <i className="fa-solid fa-circle-exclamation" />
              비밀번호가 일치하지 않습니다
            </span>
          )}
        </WarnSet>
      </InfoBlock>
    </div>
  );
};
export default NewPassword;
