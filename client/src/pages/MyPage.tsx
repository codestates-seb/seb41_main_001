import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MyRecruitItem from '../components/MyRecruitItem';
import Badge from '../components/Badge';

const Background = styled.div`
    padding-top: 100px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color: var(--gray);
`;

const MyPageWrapper = styled.div`
    margin-top: 100px 100px 100px 0;
    padding: 50px 430px;
    background-color: var(--gray);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const MyPageHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    width:100%;
    margin-bottom: 50px;
`;
const Pfp = styled.div`
    margin: 10px;
    border: 2px solid white;
    border-radius: 100px;
    background-color: blue;
    width: 100px;
    height:100px;
`;

const Info = styled.div`
    margin: 10px;
    font-size:18px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    > div {
        padding: 5px;
        i {
            padding: 0 10px;
        }
    }
    > div:first-child {
        color: var(--neon-yellow);
        font-size: 24px;
        padding: 10px 15px;
      text-shadow: white 0 0 3px;
    }
`;

const HeadInfo = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
`;

const Button = styled(Link)`
    border: 1px solid white;
    border-radius:10px;
    align-items: center;
    padding: 15px;
    margin: 20px;
    font-size: 16px;
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
    }
`;
const MyPageBody = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    > div {
        display:flex;
        flex-direction: column;
        span {
            display:flex;
            flex-direction:row;
        }
    }
`;
const Container = styled.div`
    margin: 10px;
    display:flex;
    flex-direction: column;
    > div:first-child {
      text-shadow: white 0 0 3px;
      font-size:18px;
      margin: 2px 8px;
      padding: 5px;
    }
    > span {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
`;

const MyBoard = styled.div`
    border: 2px solid white;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;
    width: 760px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    > span {
      font-size:15px;
      display:flex;
      flex-direction: row;
      width:100%;
      justify-content: flex-start;
      span {
        margin: 5px 10px;
      }
    }
    > div {
      margin: 20px;
    }
`;

const RegisteredBoard = styled.div`
    border: 2px solid white;
    width: 760px;
    border-radius: 20px;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    > div {
      margin: 20px;
    }
`;
const Badges = styled.div`
    border: 2px solid white;
    margin: 10px;
    padding: 10px;
    width:330px;
    border-radius:10px;
`;
const Tags = styled.div`
    border: 2px solid white;
    padding: 10px;
    margin: 10px;
    width: 160px;
    height: 120px;
    border-radius:10px;
    > span {
      margin: 5px;
      padding: 3px 0;
    }
`;
const PersonalInfo = styled.div`
    border: 2px solid white;
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    padding: 20px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction:row;
  padding: 5px;
  > div:first-child {
    width: 120px;
    display: flex;
    justify-content: flex-end;
    text-shadow: white 0 0 5px;
  }
  > div {
    margin: 10px;
    > div {
      margin: 0 5px 10px 0;
    }
  }
`;

const MyPage = () => (
  <div>
    <Background>
      <MyPageWrapper>
        <MyPageHeader>
          <HeadInfo>
            <Pfp />
            <Info>
              <div>NickName</div>
              <div>
                <i className="fa-solid fa-heart" />
                87
              </div>
              <div>
                <i className="fa-regular fa-calendar" />
                Member for 1 Months
              </div>
            </Info>
          </HeadInfo>
          <Button to="/members/edit">
            <i className="fa-solid fa-pen" />
            프로필 수정
          </Button>
        </MyPageHeader>
        <MyPageBody>
          <div>
            <Container>
              <div>작성 게시글</div>
              <MyBoard>
                <span>
                  <span>모집게시판</span>
                  <span>자유게시판</span>
                </span>
                <MyRecruitItem title="title" quota="quota" dueDate="dueDate" tags={['tags']} />
                <MyRecruitItem title="같이 농구할 사람 구해요~" quota="2/5" dueDate="2023.01.30" tags={['#농구']} />
              </MyBoard>
            </Container>
            <Container>
              <div>좋아요한 게시글</div>
              <MyBoard>
                <span>
                  <span>모집게시판</span>
                  <span>자유게시판</span>
                </span>
                <MyRecruitItem title="좋아요한 게시글" quota="2/3" dueDate="2023.01.17" tags={['#좋아요']} />
              </MyBoard>
            </Container>
            <Container>
              <div>신청한 모집글</div>
              <RegisteredBoard>
                <div>글이 아직 없습니다.</div>
              </RegisteredBoard>
            </Container>
          </div>
          <div>
            <span>
              <Container>
                <div>뱃지</div>
                <Badges>
                  <Badge />
                </Badges>
              </Container>
              <Container>
                <div>관심 태그</div>
                <Tags>
                  <span># 스쿠버다이빙</span>
                  <span># 헬스/크로스핏</span>
                  <span># 축구</span>
                </Tags>
              </Container>
            </span>
            <Container>
              <div>개인정보</div>
              <PersonalInfo>
                <InfoBlock>
                  <div>이름</div>
                  <div>우인유</div>
                </InfoBlock>
                <InfoBlock>
                  <div>생년월일</div>
                  <div>980217</div>
                </InfoBlock>
                <InfoBlock>
                  <div>성별</div>
                  <div>여성</div>
                </InfoBlock>
                <InfoBlock>
                  <div>이메일</div>
                  <div>kellycho1031@gmail.com</div>
                </InfoBlock>
                <InfoBlock>
                  <div>휴대폰 번호</div>
                  <div>010-1234-5678</div>
                </InfoBlock>
                <InfoBlock>
                  <div>등록 지역</div>
                  <div>
                    <div>서울시 강서구</div>
                    <div>수원시</div>
                  </div>
                </InfoBlock>
              </PersonalInfo>
              <span>
                <Button to="/members/withdrawl">회원 탈퇴</Button>
              </span>
            </Container>
          </div>
        </MyPageBody>
      </MyPageWrapper>
    </Background>
  </div>
);
export default MyPage;
