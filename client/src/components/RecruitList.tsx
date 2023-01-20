import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import TagLink from './TagLink';
import timeDifference from '../utils/timeDifference';
import CreatorCard from './CreatorMiniCard';
import classifyingGender from '../utils/classifyingGender';
import classifyingStatus from '../utils/classifyingStatus';
import classifyingAge from '../utils/classifyingAge';

const ListContainer = styled.li`
  width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  > div:last-child {
    display: flex;
  }
`;

const ListTitle = styled(Link)`
  text-decoration: none;
  color: #b2b2b2;
  font-weight: 600;
  font-size: 22px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  &:hover {
    color: white;
    transition: 0.2s ease-in-out;
  }
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  margin-right: 20px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    i {
      margin-right: 7px;
    }
    &:nth-child(1) {
      i {
        color: var(--neon-yellow);
      }
    }
    &:nth-child(2) {
      i {
        color: var(--neon-red);
      }
    }
    &:nth-child(3) {
      i {
        color: var(--neon-blue);
      }
    }
  }
`;

const ListCondition = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    > div {
      width: 120px;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 1rem;
      position: relative;
      padding-top: 30px;
      i {
        margin-bottom: 15px;
        font-size: 36px;
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
        &.fa-hourglass-half {
          color: var(--neon-blue);
        }
        &.fa-circle-check {
          color: var(--neon-green);
        }
        &.fa-calendar-check {
          color: white;
        }
      }
      > span:first-child {
        font-size: 0.9rem;
        position: absolute;
        top: 10px;
      }
      &:nth-child(3) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 30px 10px 10px 10px;
        justify-content: center;
        align-items: center;
        > span:not(:first-child) {
          margin: 2px;
          white-space: nowrap;
        }
      }
      /* transition: 0.2s ease-in-out;

      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
        transition: 0.2s ease-in-out;
      } */
    }
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 255px;
      height: 100px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 20px;
      > div:first-child {
        text-align: left;
        white-space: nowrap;
        font-size: 14px;
        padding-right: 10px;
      }
      > div:nth-child(2) {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        word-break: keep-all;
        line-height: 120%;
      }
      h4 {
        margin: 0;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          font-weight: 400;
        }
      }
      /* transition: 0.2s ease-in-out;

      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
        transition: 0.2s ease-in-out;
      } */
    }
  }
`;

const ProfileImgContainer = styled.div`
  width: 100%;
  position: absolute;
  top: -50%;
  left: 0;
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;

interface ProfileImgProps {
  key: number;
  'img-id': number;
  src: string;
  alt: string;
}

const ProfileImg = styled.img<ProfileImgProps>`
  margin-left: -12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  &:nth-child(${(props) => props['img-id']}) {
    z-index: ${(props) => props['img-id']};
    // left: calc(-100% + ${(props) => props['img-id']} * 10px);
  }
`;

// const DATA: RecruitDataProps[] = [
//   {
//     recruitId: 1,
//     title: 'TITLE1',
//     body: 'BODY1',
//     image: '',
//     createdAt: '2023-01-02T16:18:48.908218',
//     modifiedAt: '2023-01-02T16:18:48.908218',
//     status: '모집중', // 모집중/모집완료/활동종료
//     star: 0,
//     views: 0,
//     memberId: 1,
//     nickname: "aaa",
//     like: 0,
//     heart: 50, // number, 0
//     ageGroup: [20, 30],
//     sex: 'Both', // Male, Female, Both
//     applies: [{memberId: 2, nickname: "bbb"},
//                 {memberId: 3, nickname: "ccc"},{memberId: 4, nickname: "ddd"}],
//     minRequire: 2,
//     require: 5,
//     date: '2023-01-02T16:18:48.908218',
//     tagId: 1,
//     tagName: "축구/풋볼",
//     tagEmoji: "⚽️"
//   },
// ];

const RecruitList = (props: { data: RecruitDataProps }) => {
  const {
    data: {
      recruitTags,
      recruitId,
      title,
      star,
      likes,
      views,
      sex,
      heart,
      ageGroup,
      recruitStatus,
      applies,
      minRequire,
      require,
      date,
      memberId,
      nickname,
    },
  } = props;
  const { tagId, tagName, tagEmoji } = recruitTags[0];

  const convertToDate = (time: string) => {
    const DATE = new Date(time);
    return `${
      DATE.getMonth() + 1
    }월 ${DATE.getDate()}일 ${DATE.getHours()}시 ${DATE.getMinutes()}분`;
  };

  const applyMsg = (
    apply: { memberId: number; nickname: string; heart: number }[],
    minimum: number,
    maximum: number,
  ) => {
    let msg;
    let color;
    if (apply.length >= maximum) {
      msg = '모집이 완료되었습니다. 다음 기회에 참가해주세요!';
      color = 'var(--neon-blue)';
    } else if (apply.length >= minimum) {
      msg = '최소인원이 충족되었습니다!';
      color = 'var(--neon-green)';
    } else if (apply.length < minimum) {
      msg = '최소인원이 충족되지 못했습니다';
      color = 'var(--neon-orange)';
    }
    return { msg, color };
  };

  return (
    <ListContainer>
      <div>
        <TagLink
          value={`${tagEmoji} ${tagName}`}
          to={`/tags/${tagId}/${tagName}`}
        />
        <ListTitle to={`/recruit/${recruitId}`}>{title}</ListTitle>
      </div>
      <div>
        <ListInfo>
          <div>
            <i className="fa-solid fa-star" />
            {star}
          </div>
          <div>
            <i className="fa-solid fa-heart" />
            {likes}
          </div>
          <div>
            <i className="fa-solid fa-eye" />
            {views}
          </div>
          <CreatorCard memberId={memberId} nickname={nickname} heart={heart} />
        </ListInfo>
        <ListCondition>
          <div>
            <div>
              <span>성별</span>
              <i className={`${classifyingGender(sex).icon}`} />
              {classifyingGender(sex).text}
            </div>
            <div>
              <span>심박수</span>
              <i className="fa-solid fa-heart-circle-exclamation" />
              <span>{`${heart} 이상`}</span>
            </div>
            <div>
              <span>나이대</span>
              {classifyingAge(ageGroup).map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
            <div>
              <span>현재 상태</span>
              <i className={`${classifyingStatus(recruitStatus).icon}`} />
              <span>{recruitStatus}</span>
            </div>
          </div>
          <div>
            <div>
              <div>인원</div>
              <div>
                <h4>
                  <ProfileImgContainer>
                    {applies.map((el, i) => (
                      <ProfileImg
                        key={el.memberId}
                        img-id={i + 1}
                        src={`https://picsum.photos/seed/${el.memberId}/20/20.webp`}
                        alt={`avatar of ${el.nickname}`}
                      />
                    ))}
                  </ProfileImgContainer>
                  {`${applies.length} / ${require}명`}
                  <span>{`(최소 ${minRequire}명 이상)`}</span>
                </h4>
                <div
                  style={{
                    color: `${applyMsg(applies, minRequire, require).color}`,
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  {`${applyMsg(applies, minRequire, require).msg}`}
                </div>
              </div>
            </div>
            <div>
              <div>시간</div>
              <div>
                <h4>{`${convertToDate(date)}`}</h4>
                <div>{`${timeDifference(date)}`}</div>
              </div>
            </div>
          </div>
          <div />
        </ListCondition>
      </div>
    </ListContainer>
  );
};

export default RecruitList;
