import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Badge from '../components/Badge';
import Loading from './Loading';
import MiniTag from '../components/MiniTag';
import WroteRecruit from '../components/WroteRecruit';
import WroteFree from '../components/WroteFree';

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
  align-items: center;
  width: 100%;
`;

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40rem;
  margin-bottom: 50px;
`;
const Pfp = styled.img`
  margin: 10px;
  border: 2px solid white;
  border-radius: 100px;
  /* background-color: pink; */
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
  span {
    margin-left: 5px;
  }
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MyPageBody = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
    > span {
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
    .active {
      color: var(--neon-yellow);
      margin: 5px 0px;
      background-color: var(--gray);
      text-shadow: white 0 0 3px;
      border: none;
      font-weight: bold;
    }
    .inactive {
      margin: 5px 0px;
      background-color: var(--gray);
      border: none;
      color: white;
      &:hover {
        color: var(--neon-yellow);
        text-shadow: white 0 0 3px;
        cursor: pointer;
      }
    }
  }
  > div {
    margin: 15px;
  }
`;

// const Badges = styled.div`
//   border: 2px solid white;
//   margin: 10px;
//   padding: 10px;
//   width: 25rem;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: row;
// `;
// const Tags = styled.div`
//   border: 2px solid white;
//   padding: 1rem 2rem;
//   margin: 10px;
//   width: 100%;
//   border-radius: 10px;
//   > span {
//     margin: 5px;
//     padding: 3px 0;
//   }
// `;
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
      margin: 0 5px 8px 0;
    }
    span {
      margin-right: 3px;
    }
  }
`;

const MemberPage = () => {
  const { memberId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [wroteTab, setWroteTab] = useState('작성모집');
  const [oneUser, setOneUsers] = useState({
    memberId: 1,
    name: 'Loading...',
    birth: 'Loading...',
    nickname: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
    sex: 'Loading...',
    createdAt: 'Loading...',
    heart: 50,
    location: '위치',
    memberTags: [
      {
        tagId: 1,
        tagName: 'Loading...',
      },
    ],
    memberImage: {
      filePath: '',
      fileSize: 1,
      memberId: 1,
      memberImageId: 1,
      originalFileName: '',
      storedFileName: '',
    },
    applies: [],
    recruits: [],
    recruitComments: [],
    recruitLikes: [],
    frees: [],
    freeLikes: [],
    reviews: [],
  });
  const recruitWTab = () => setWroteTab('작성모집');
  const freeWTab = () => setWroteTab('작성자유');
  useEffect(() => {
    const getOneUser = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/${memberId}`)
        .then((res: any) => {
          console.log(res);
          setOneUsers(res.data);
          setIsLoading(false);
        })
        .catch((err: any) => console.log(err));
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
                <Pfp
                  src={
                    oneUser.memberImage
                      ? oneUser.memberImage.filePath
                      : `https://picsum.photos/seed/${oneUser.memberId}/20/20.webp`
                  }
                />
                <Info>
                  <div>{oneUser.nickname}</div>
                  <div>
                    <i className="fa-solid fa-heart" />
                    {oneUser.heart}
                  </div>
                </Info>
              </HeadInfo>
            </MyPageHeader>
            <MyPageBody>
              <div>
                <Container>
                  <div>개인정보</div>
                  <PersonalInfo>
                    <InfoBlock>
                      <div>성별</div>
                      <div>{oneUser.sex}</div>
                    </InfoBlock>
                    <InfoBlock>
                      <div>등록 지역</div>
                      <div>
                        <div>{oneUser.location}</div>
                        {/* {oneUser.locations[1] && (
                          <div>{oneUser.locations[1]}</div>
                        )}
                        {oneUser.locations[2] && (
                          <div>{oneUser.locations[2]}</div>
                        )} */}
                      </div>
                    </InfoBlock>
                    <InfoBlock>
                      <div>관심 태그</div>
                      <div>
                        {oneUser.memberTags.map((item) => (
                          <MiniTag key={item.tagId} tagName={item.tagName} />
                        ))}
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
                      <button
                        onClick={recruitWTab}
                        type="button"
                        className={
                          wroteTab === '작성모집' ? 'active' : 'inactive'
                        }
                      >
                        모집게시판
                      </button>
                      <button
                        onClick={freeWTab}
                        type="button"
                        className={
                          wroteTab === '작성자유' ? 'active' : 'inactive'
                        }
                      >
                        자유게시판
                      </button>
                    </span>
                    {wroteTab === '작성모집' ? (
                      <WroteRecruit data={oneUser.recruits} />
                    ) : (
                      <WroteFree data={oneUser.frees} />
                    )}
                    {/* {
                      oneUser.recruits.length === 0 ? (
                        <div>글이 아직 없습니다</div>
                      ) : (
                        oneUser.recruits.map((e: RecruitDataProps) => (
                          <MyRecruitItem
                            key={e.recruitId}
                            title={e.title}
                            quota={`${e.applies.length}/${e.require}`}
                            tags={e.recruitTags}
                            dueDate={e.date}
                            id={e.recruitId}
                          />
                        ))
                      )
                      // free가 생기면 여기도 위 recruits랑 똑같이 삼항 넣어주자
                    } */}
                    {/* // <MyRecruitItem
                    //   title="title"
                    //   quota="quota"
                    //   dueDate="dueDate"
                    //   tags={['tags']}
                    // />
                    // <MyRecruitItem
                    //   title="같이 농구할 사람 구해요~"
                    //   quota="2/5"
                    //   dueDate="2023.01.30"
                    //   tags={['#농구']}
                    // /> */}
                  </MyBoard>
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
export default MemberPage;
