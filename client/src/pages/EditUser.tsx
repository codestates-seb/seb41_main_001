import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const EditContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 150px;
`;

const Container = styled.div`
    margin: 10px;
    display:flex;
    flex-direction: column;
    > div:first-child {
      text-shadow: white 0 0 3px;
      font-size:24px;
      margin: 20px;
      text-align: center;
    }
    > span {
      width: 100%;
      display: flex;
      justify-content: center;
    }
`;

const PersonalInfo = styled.div`
    border: 2px solid white;
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    padding: 40px 50px 40px 20px;
`;

const InfoBlock = styled.label`
  display: flex;
  flex-direction:row;
  padding: 5px;
  margin: 8px;
  > div:first-child {
    width: 120px;
    display: flex;
    justify-content: flex-start;
    align-items:flex-end;
    text-shadow: white 0 0 5px;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 20px;
  }
  input {
    margin-bottom: 15px;
    background-color: var(--gray);
    padding: 5px;
    font-size: 16px;
    border:none;
    border-bottom: 2px solid gray;
    width: 250px;
    outline: none;
    color: white;
    &:focus-within {
      border-bottom: 2px solid white;
      transition: 0.2s ease-in-out;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 20px var(--gray) inset;
      -webkit-text-fill-color: white;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
      margin: 5px 5px 10px 0;
      font-size: 15px;
      > i {
        color: white;
        font-size: 16px;
        margin-left: 15px;
        &:hover {
        color: var(--neon-blue);
          transition: 0.2s ease-in-out;
        }
      }
    }
  }
`;

const Pfp = styled.div`
  width: 150px;
  height: 150px;
  background-color: pink;
  border: 2px solid white;
  border-radius: 100px;
  margin: 0 10px;
`;

const Button = styled(Link)`
    border: 1px solid white;
    border-radius:10px;
    align-items: center;
    padding: 15px;
    margin: 15px 30px;
    font-size: 20px;
    height: 50px;
    text-align: center;
    display:flex;
    text-decoration:none;
    color: white;
    justify-content: center;
    i {
        padding-right: 10px;
    }
    &:hover {
        background-color:black;
        text-shadow: white 0 0 5px;
        transition: 0.2s ease-in-out;
    }
`;

const NoLinkButton = styled.button`
    border: 1px solid white;
    border-radius:10px;
    align-items: center;
    margin: 3px 0px 15px 20px;
    font-size: 14px;
    text-align: center;
    display:flex;
    color: white;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--gray);
    padding: 5px 10px;
    i {
      padding-right: 5px;
    }
    &:hover {
        background-color:black;
        text-shadow: white 0 0 5px;
        transition: 0.2s ease-in-out;
    }
`;

const EditUser = () => {
  const { id } = useParams();

  return (
    <EditContainer>
      <Container>
        <div>회원정보 수정</div>
        <PersonalInfo>
          <InfoBlock htmlFor="pfp">
            <div>프로필 사진</div>
            <div>
              <Pfp />
            </div>
            <div>
              <NoLinkButton>
                <i className="fa-solid fa-arrows-rotate" />
                변경
              </NoLinkButton>
              <NoLinkButton>
                <i className="fa-solid fa-trash" />
                삭제
              </NoLinkButton>
            </div>
          </InfoBlock>
          <InfoBlock htmlFor="nickname">
            <div>닉네임</div>
            <input type="text" name="nickname" placeholder="NickName" />
            <NoLinkButton>중복 확인</NoLinkButton>
          </InfoBlock>
          <InfoBlock htmlFor="formerPassword">
            <div>기존 비밀번호</div>
            <input type="password" name="formerPassword" />
          </InfoBlock>
          <InfoBlock htmlFor="newPassword">
            <div>새 비밀번호</div>
            <input type="password" name="newPassword" />
          </InfoBlock>
          <InfoBlock htmlFor="newPasswordCheck">
            <div>새 비밀번호 확인</div>
            <input type="password" name="newPasswordCheck" />
          </InfoBlock>
          <InfoBlock htmlFor="phone">
            <div>휴대폰 번호</div>
            <input type="tel" name="phone" placeholder="010-1234-5678" />
            <NoLinkButton>중복 확인</NoLinkButton>
          </InfoBlock>
          <InfoBlock htmlFor="location">
            <div>등록 지역 변경</div>
            <div>
              <input type="string" name="location" placeholder="location" />
              <div>
                서울시 강서구
                <i className="fa-solid fa-xmark" />
              </div>
              <div>
                수원시
                <i className="fa-solid fa-xmark" />
              </div>
            </div>
          </InfoBlock>
          <InfoBlock htmlFor="tags">
            <div>등록 태그 변경</div>
            <div>
              <input type="string" name="tags" placeholder="tags" />
              <div>
                스케이트/인라인
                <i className="fa-solid fa-xmark" />
              </div>
              <div>
                축구
                <i className="fa-solid fa-xmark" />
              </div>
            </div>
          </InfoBlock>
        </PersonalInfo>
        <span>
          <Button to={`/members/mypage/${id}`}>
            <i className="fa-solid fa-square-check" />
            저장하기
          </Button>
          <Button to={`/members/mypage/${id}`}>
            <i className="fa-solid fa-xmark" />
            취소하기
          </Button>
        </span>
      </Container>
    </EditContainer>
  );
};

export default EditUser;
