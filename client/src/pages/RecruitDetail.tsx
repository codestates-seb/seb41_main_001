import styled from 'styled-components';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import CreatorCard from '../components/CreatorCard';
import KakaoMap from '../components/KakaoMap';
import classifyingGender from '../utils/classifyingGender';
import classifyingAge from '../utils/classifyingAge';
import modifyingDate from '../utils/modifyingDate';
import RecruitCreatorSelectBox from '../components/RecruitCreatorSelectBox';
import CommentBox from '../components/CommentBox';
import CommentSubmitBox from '../components/CommentSubmitBox';
import Button from '../components/Button';
import RecruitApplyBeforeMeeting from '../components/RecruitApplyBeforeMeeting';
import RecruitApplyAfterMeeting from '../components/RecruitApplyAfterMeeting';

const MainContainer = styled.main`
  width: 900px;
  color: white;
  margin-top: 100px;
  margin-bottom: 50px;
  h1 {
    font-size: 200%;
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    > div:first-child {
      > span {
        margin-right: 12px;
        i {
          margin-right: 7px;
        }
      }
    }
  }
`;

const ContentBox = styled.div`
  padding: 10px;
  margin: 10px 0px;
  line-height: 150%;
  font-size: 100%;
`;

const LocationBox = styled.div`
  display: flex;
  margin-bottom: 40px;
  > div {
    width: 100%;
    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      margin-right: 20px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 110%;
      > span {
        margin-bottom: 20px;
      }
    }
    &:last-child {
      width: 100%;
    }
  }
`;

const ConditionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    width: 130px;
    height: 130px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 90%;
    padding: 10px;
    text-align: center;
    word-break: keep-all;
    line-height: 150%;
    i {
      margin-bottom: 20px;
      font-size: 220%;
      &.fa-mars {
        color: var(--neon-blue);
      }
      &.fa-venus {
        color: var(--neon-red);
      }
      &.fa-venus-mars {
        color: #993bf4;
      }
      &.fa-heart-circle-exclamation {
        color: var(--neon-red);
      }
    }
    &:last-child {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      span {
        margin: 2px;
        &:first-child {
          font-size: 85%;
        }
      }
    }
  }
`;

const ButtonArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LikeButton = styled(Button)<{ likes: boolean }>`
  color: ${(props) => (props.likes ? 'var(--neon-red)' : 'white')};
  border: 1px solid ${(props) => (props.likes ? 'var(--neon-red)' : 'white')};
`;

const CommentArea = styled.div`
  h3 {
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    font-size: 120%;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  > form:last-child {
    padding: 20px;
  }
`;

const RecruitDetail = () => {
  const DATA: RecruitDataProps = {
    recruitId: 1,
    title:
      '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
    body: '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
    image: '',
    createdAt: '2023-01-02T16:18:48.908218',
    modifiedAt: '2023-01-20T16:18:48.908218',
    recruitStatus: '활동종료', // 모집중/모집완료/최소인원충족/활동종료
    star: 0,
    views: 0,
    memberId: 1,
    nickname: '글자수세기TEST글자수세기TEST글자',
    likes: 0,
    location: { latitude: 37.343336, longitude: 127.1233716 },
    heart: 50, // number, 0
    ageGroup: ['10', '20', '30', '40', '50', '60'],
    sex: 'Male', // Male, Female, Both
    applies: [
      // { memberId: 1, nickname: 'aaa', heart: 80 },
      { memberId: 2, nickname: 'blueblueblueblue', heart: 80 },
      { memberId: 3, nickname: 'coolcirclecar', heart: 80 },
      { memberId: 4, nickname: 'doordoordoor', heart: 80 },
      { memberId: 5, nickname: 'element', heart: 80 },
      { memberId: 6, nickname: 'frifrifriday', heart: 80 },
      { memberId: 7, nickname: 'goodgamegone', heart: 80 },
      { memberId: 8, nickname: 'hihihi', heart: 80 },
      { memberId: 9, nickname: 'icyiceice', heart: 80 },
    ],
    minRequire: 2,
    require: 5,
    date: '2023-01-02T16:18:48.908218',
    recruitTags: [{ tagId: 1, tagName: '축구/풋볼', tagEmoji: '⚽️' }],
    recruitLikes: [
      {
        memberId: 1,
      },
    ],
    reviews: [
      {
        reviewId: 1,
        memberId: 1,
        nickname: '닉네임',
        heart: 50,
        body: '글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TEST글자수TES',
        star: 5,
      },
      {
        reviewId: 2,
        memberId: 2,
        nickname: '글자수세기TEST글자수세기TEST글자',
        heart: 50,
        body: '좋아요',
        star: 2,
      },
    ],
    recruitComments: [
      {
        memberId: 1,
        nickname: 'holiday',
        heart: 50,
        body: '안녕하세요',
        createdAt: '2023-01-18T17:35:10.171566',
        modifiedAt: '2023-01-18T17:35:10.165851',
      },
      {
        memberId: 2,
        nickname: '글자수세기TEST글자수세기TEST글자',
        heart: 50,
        body: '글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기TEST글자수세기',
        createdAt: '2023-01-18T17:35:10.171566',
        modifiedAt: '2023-01-18T17:35:10.165851',
      },
    ],
  };

  const LOGIN_ID = 1;
  // 좋아요를 누른 멤버아이디만 모아둠 [1, 2, 3, 4...]
  const LIKES_MEMBER_ID = DATA.recruitLikes.reduce((res: number[], ele) => {
    res.push(ele.memberId);
    return res;
  }, []);

  const APPLICANTS_ID = DATA.applies.reduce((res: number[], ele) => {
    res.push(ele.memberId);
    return res;
  }, []);

  const checkIfMeetingEnded = (d: string) => {
    const TIME_INPUT = new Date(d).getTime();
    const TIME_NOW = new Date().getTime();

    if (TIME_INPUT < TIME_NOW) return true; // Meeting Ended.
    return false; // Meeting Yet.
  };

  return (
    <MainContainer>
      <h1>{DATA.title}</h1>
      <div>
        <div>
          <span>
            <i className="fa-regular fa-clock" />
            {`${modifyingDate(DATA.modifiedAt)}`}
          </span>
          <span>
            <i className="fa-solid fa-eye" />
            {DATA.views}
          </span>
        </div>
        <CreatorCard
          memberId={DATA.memberId}
          nickname={DATA.nickname}
          heart={DATA.heart}
        />
      </div>
      <ContentBox>{DATA.body}</ContentBox>
      <LocationBox>
        <div>
          <span>{`📌 언제? ${modifyingDate(DATA.date)}`}</span>
          <span>📌 어디서? 우측의 지도 참고</span>
          <span>📌 조건</span>
          <ConditionBox>
            <div>
              <i className={`${classifyingGender(DATA.sex).icon}`} />
              {classifyingGender(DATA.sex).text}
            </div>
            <div>
              <i className="fa-solid fa-heart-circle-exclamation" />
              <span>{`심박수 ${DATA.heart} 이상`}</span>
            </div>
            <div>
              <span>신청 가능 연령</span>
              {classifyingAge(DATA.ageGroup).map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
          </ConditionBox>
        </div>
        <div>
          <KakaoMap
            latitude={DATA.location.latitude}
            longitude={DATA.location.longitude}
            overlayvalue="모임 장소"
          />
        </div>
      </LocationBox>
      {!checkIfMeetingEnded(DATA.date) ? (
        <RecruitApplyBeforeMeeting
          applicantsId={APPLICANTS_ID}
          heartCond={DATA.heart}
          ageGroup={DATA.ageGroup}
          sexCon={DATA.sex}
          recruitStatus={DATA.recruitStatus}
          creatorId={DATA.memberId}
          applies={DATA.applies}
          minRequire={DATA.minRequire}
          require={DATA.require}
        />
      ) : (
        <RecruitApplyAfterMeeting
          recruitStatus={DATA.recruitStatus}
          applies={DATA.applies}
          minRequire={DATA.minRequire}
          require={DATA.require}
          applicantsId={APPLICANTS_ID}
          creatorId={DATA.memberId}
          reviews={DATA.reviews}
          creatorNickname={DATA.nickname}
        />
      )}
      <ButtonArea>
        <LikeButton
          likes={LIKES_MEMBER_ID.includes(LOGIN_ID)}
          value={`좋아요 ${LIKES_MEMBER_ID.length}`}
          onClick={() => {
            console.log(`/recruits/${DATA.recruitId}/likes`, '좋아요!');
          }}
          icon={<i className="fa-solid fa-heart" />}
        />

        {DATA.memberId === LOGIN_ID ? (
          <RecruitCreatorSelectBox
            applies={DATA.applies}
            modifiedAt={DATA.modifiedAt}
          />
        ) : (
          ''
        )}
      </ButtonArea>
      <CommentArea>
        <h3>{`${DATA.recruitComments.length}개의 댓글이 있습니다`}</h3>
        <ul>
          {DATA.recruitComments.map((el) => (
            <CommentBox
              key={el.memberId}
              memberId={DATA.memberId}
              board="recruits"
              boardId={DATA.recruitId}
              applicantsId={APPLICANTS_ID}
              data={el}
            />
          ))}
        </ul>
        <CommentSubmitBox submitComment={`/recruits/${DATA.recruitId}`} />
      </CommentArea>
    </MainContainer>
  );
};

export default RecruitDetail;
