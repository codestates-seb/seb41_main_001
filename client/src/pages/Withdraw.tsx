import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

const WithdrawContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  > div {
    padding: 10px;
    margin: 20px;
    input {
      margin-right: 30px;
      width: 40px;
    }
    label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    span {
      padding-left: 30px;
    }
    li {
      margin-bottom: 10px;
    }
  }
  > div:first-child {
    font-size: 24px;
    text-shadow: white 0 0 5px;
  }
`;

const WithdrawWrapper = styled.div`
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 900px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  > button {
    border: 1px solid white;
    border-radius: 10px;
    align-items: center;
    padding: 15px;
    margin: 10px;
    font-size: 16px;
    height: 50px;
    text-align: center;
    display: flex;
    text-decoration: none;
    color: white;
    justify-content: center;
    background-color: var(--gray);
    &:hover {
      background-color: var(--neon-yellow);
      cursor: pointer;
    }
    &:disabled {
      background-color: var(--gray);
      color: gray;
      border: 1px solid gray;
    }
  }
`;

const Button = styled(Link)`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
  margin: 10px;
  font-size: 16px;
  height: 50px;
  text-align: center;
  display: flex;
  text-decoration: none;
  color: white;
  justify-content: center;
  &:hover {
    background-color: var(--neon-yellow);
  }
`;

const Withdraw = () => {
  // const { memberId } = useParams();
  // let checker:(HTMLElement|null) = document.getElementById('consent');
  // let wbtn:(HTMLElement|null) = document.getElementById('withdraw');
  // checker.onchange = function() {
  //   wbtn.disabled = !!this.checked;
  // };
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(false);
  const changeAgreement = () => setAgreement(!agreement);
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);

  const withdrawal = () => {
    // 여기에 axios patch 넣어주면 됨.
    axios
      .patch(`${process.env.REACT_APP_API_URL}/members/my-page/withdraw`, {
        headers: {
          Authorization: accessToken,
          Refresh: refreshToken,
        },
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => console.log(err));
    navigate('/');
    // console.log(memberId, ' withdrew');
  };
  return (
    <WithdrawWrapper>
      <WithdrawContainer>
        <div>회원탈퇴</div>
        <div>
          <span>
            저희 사이트에서 탈퇴하시기 전에, 회원 탈퇴의 의미에 대해서 간략히
            설명드리고자 합니다.
          </span>
          <ul>
            <li>
              삭제는 돌이킬 수 없습니다. 탈퇴 이후 결정을 바꾼다고 해도, 원
              저작물을 다시 가져갈 방법은 없습니다.
            </li>
            <li>
              게시글과 댓글은 사이트에 존속됩니다. 작성자는 User00으로 표시되며,
              재가입할 경우에도 저작권을 주장할 수 없습니다.
            </li>
          </ul>
        </div>
        <div>
          <label htmlFor="consent">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              value="agree"
              onClick={changeAgreement}
            />
            <div>
              본인은 위에 적힌 정보를 읽었으며 회원 탈퇴의 의미를 이해합니다.
              <br />
              <br />
              회원 탈퇴 진행에 동의합니다.
            </div>
          </label>
        </div>
        <ButtonContainer>
          <button
            type="button"
            id="withdraw"
            disabled={!agreement}
            onClick={withdrawal}
          >
            탈퇴하기
          </button>
          <Button to="/members/mypage">돌아가기</Button>
        </ButtonContainer>
      </WithdrawContainer>
    </WithdrawWrapper>
  );
};

export default Withdraw;
