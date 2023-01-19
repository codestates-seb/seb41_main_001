import styled from 'styled-components';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import CreatorCard from '../components/CreatorCard';
import KakaoMap from '../components/KakaoMap';
import classifyingGender from '../utils/classifyingGender';
import classifyingAge from '../utils/classifyingAge';
import modifyingDate from '../utils/modifyingDate';
import RecruitCreatorSelectBox from '../components/RecruitCreatorSelectBox';
import RecruitSelectBox from '../components/RecruitSelectBox';
import CommentBox from '../components/CommentBox';

const MainContainer = styled.main`
  width: 900px;
  color: white;
  margin-top: 100px;

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
  font-size: 16px;
`;

const LocationBox = styled.div`
  display: flex;
  > div {
    width: 100%;
    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin-right: 20px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 1.2rem;
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
  justify-content: space-around;
  > div {
    width: 130px;
    height: 130px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding: 0.5rem;
    text-align: center;
    word-break: keep-all;
    line-height: 150%;
    i {
      margin-bottom: 10px;
      font-size: 32px;
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
          font-size: 0.9rem;
        }
      }
    }
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
    modifiedAt: '2023-01-02T16:18:48.908218',
    recruitStatus: '모집중', // 모집중/모집완료/활동종료
    star: 0,
    views: 0,
    memberId: 1,
    nickname: '글자수세기TEST글자수세기TEST글자',
    likes: 0,
    location: { latitude: 37.343336, longitude: 127.1233716 },
    heart: 50, // number, 0
    ageGroup: ['10', '20', '30', '40', '50', '60'],
    sex: 'Both', // Male, Female, Both
    applies: [
      { memberId: 2, nickname: 'bbb', heart: 80 },
      { memberId: 3, nickname: 'ccc', heart: 80 },
      { memberId: 4, nickname: 'ddd', heart: 80 },
      { memberId: 5, nickname: 'eee', heart: 80 },
      { memberId: 6, nickname: 'fff', heart: 80 },
      { memberId: 7, nickname: 'ggg', heart: 80 },
      { memberId: 8, nickname: 'hhh', heart: 80 },
      { memberId: 9, nickname: 'iii', heart: 80 },
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
        memberId: 1,
        nickname: '닉네임',
        heart: 50,
        body: '리뷰 내용',
        star: 5,
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
    ],
  };

  const LOGIN_ID = 1;

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
      {DATA.memberId === LOGIN_ID ? (
        <RecruitCreatorSelectBox />
      ) : (
        <RecruitSelectBox />
      )}
      {DATA.recruitComments.map((el) => (
        <CommentBox key={el.memberId} data={el} />
      ))}
    </MainContainer>
  );
};

export default RecruitDetail;
