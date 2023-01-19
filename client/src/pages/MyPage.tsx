import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyRecruitItem from '../components/MyRecruitItem';
import Badge from '../components/Badge';
import Loading from './Loading';

const Background = styled.div`
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);
`;

const MyPageWrapper = styled.div`
  padding: 50px 430px;
  background-color: var(--gray);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  width: 100%;
`;

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40rem;
  margin-bottom: 50px;
`;
const Pfp = styled.div`
  margin: 10px;
  border: 2px solid white;
  border-radius: 100px;
  background-color: blue;
  width: 130px;
  height: 130px;
`;

const Info = styled.div`
  margin: 10px;
  font-size: 16px;
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
    font-size: 25px;
    padding: 10px 15px;
    text-shadow: white 0 0 3px;
    font-weight: bold;
  }
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled(Link)`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
  margin: 20px;
  font-size: 16px;
  height: 50px;
  text-align: center;
  display: flex;
  text-decoration: none;
  color: white;
  justify-content: center;
  i {
    padding-right: 10px;
  }
  &:hover {
    background-color: black;
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
  }
`;
const MyPageBody = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    span {
      display: flex;
      flex-direction: row;
    }
  }
`;
const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  > div:first-child {
    text-shadow: white 0 0 3px;
    font-size: 18px;
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
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > span {
    font-size: 15px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    span {
      margin: 5px 10px;
      &:hover {
        color: var(--neon-yellow);
        text-shadow: white 0 0 3px;
      }
    }
  }
  > div {
    margin: 15px;
  }
`;

const RegisteredBoard = styled.div`
  border: 2px solid white;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > div {
    margin: 20px;
  }
`;
const Badges = styled.div`
  border: 2px solid white;
  margin: 10px;
  padding: 10px;
  width: 25rem;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
`;
const Tags = styled.div`
  border: 2px solid white;
  padding: 10px;
  margin: 10px;
  width: 10rem;
  height: 120px;
  border-radius: 10px;
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
  flex-direction: row;
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

const MyPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [oneUser, setOneUsers] = useState({
    memberId: 1,
    nickname: 'NickName hey',
    heart: 87,
    sex: '여성',
    // memberSince: '1 Months',
    // email: 'kellycho1031@gmail.com',
  });

  useEffect(() => {
    const getOneUser = () => {
      fetch(
        `members/${id}`,
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setOneUsers(data.data);
          setIsLoading(false);
        });
    };
    getOneUser();
  }, []);

  return (
    <div>
      <Background>
        {!isLoading ? (
          <MyPageWrapper>
            <MyPageHeader>
              <HeadInfo>
                <Pfp />
                <Info>
                  <div>{oneUser.nickname}</div>
                  <div>
                    <i className="fa-solid fa-heart" />
                    {oneUser.heart}
                  </div>
                  <div>
                    <i className="fa-regular fa-calendar" />
                    Member for
                    {oneUser.sex}
                  </div>
                </Info>
              </HeadInfo>
              <Button to={`/members/edit/${id}`}>
                <i className="fa-solid fa-pen" />
                프로필 수정
              </Button>
            </MyPageHeader>
            <MyPageBody>
              <div>
                <span>
                  <Container>
                    <div>뱃지</div>
                    <Badges>
                      <Badge title="writer" icon="fa-solid fa-pen" />
                      <Badge title="starter" icon="fa-solid fa-star" />
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
                      <div>{oneUser.memberId}</div>
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
                </Container>
              </div>
              <div>
                <Container>
                  <div>작성 게시글</div>
                  <MyBoard>
                    <span>
                      <span>모집게시판</span>
                      <span>자유게시판</span>
                    </span>
                    <MyRecruitItem
                      title="title"
                      quota="quota"
                      dueDate="dueDate"
                      tags={['tags']}
                    />
                    <MyRecruitItem
                      title="같이 농구할 사람 구해요~"
                      quota="2/5"
                      dueDate="2023.01.30"
                      tags={['#농구']}
                    />
                  </MyBoard>
                </Container>
                <Container>
                  <div>좋아요한 게시글</div>
                  <MyBoard>
                    <span>
                      <span>모집게시판</span>
                      <span>자유게시판</span>
                    </span>
                    <MyRecruitItem
                      title="좋아요한 게시글"
                      quota="2/3"
                      dueDate="2023.01.17"
                      tags={['#좋아요']}
                    />
                  </MyBoard>
                </Container>
                <Container>
                  <div>신청한 모집글</div>
                  <RegisteredBoard>
                    <div>글이 아직 없습니다.</div>
                  </RegisteredBoard>
                  <span>
                    <Button to={`/members/withdraw/${id}`}>회원 탈퇴</Button>
                  </span>
                </Container>
              </div>
            </MyPageBody>
          </MyPageWrapper>
        ) : (
          <Loading />
        )}
      </Background>
    </div>
  );
};
export default MyPage;
