import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import TagLink from './TagLink';
import timeDifference from '../utils/timeDifference';
import CreatorCard from './CreatorMiniCard';
import classifyingGender from '../utils/classifyingGender';
import classifyingAge from '../utils/classifyingAge';

const ListContainer = styled.li`
  width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 100%;
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
  font-size: 130%;
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
  justify-content: space-between;
  align-items: center;
  width: 20%;
  margin-right: 20px;
  > div:first-child {
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      i {
        margin-right: 7px;
      }
      &:nth-child(1) {
        font-size: 80%;
        i {
          color: var(--neon-red);
        }
      }
      &:nth-child(2) {
        font-size: 80%;
        i {
          color: var(--neon-blue);
        }
      }
      &:nth-child(3) {
        font-size: 80%;
        i {
          color: var(--neon-yellow);
        }
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
      font-size: 90%;
      position: relative;
      padding-top: 30px;
      i {
        margin-bottom: 15px;
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
        &.fa-hourglass-half {
          color: var(--neon-orange);
        }
        &.fa-star-half-stroke {
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
        font-size: 90%;
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
      &:nth-child(4) {
        padding: 30px 10px 10px 10px;
        > div {
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-content: center;
          word-break: break-word;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
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
        font-size: 80%;
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
        font-size: 100%;
      }
      h4 {
        margin: 0;
        margin-bottom: 10px;
        font-size: 100%;
        span {
          font-size: 70%;
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

// const ProfileImgContainer = styled.div`
//   width: 100%;
//   position: absolute;
//   top: -50%;
//   left: 0;
//   white-space: nowrap;
//   display: flex;
//   justify-content: center;
// `;

// interface ProfileImgProps {
//   key: number;
//   'img-id': number;
//   src: string;
//   alt: string;
// }

// const ProfileImg = styled.img<ProfileImgProps>`
//   margin-left: -12px;
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   &:nth-child(${(props) => props['img-id']}) {
//     z-index: ${(props) => props['img-id']};
//     // left: calc(-100% + ${(props) => props['img-id']} * 10px);
//   }
// `;

const RecruitList = (props: { data: RecruitDataProps; setFilterTag: any }) => {
  const {
    setFilterTag,
    data: {
      recruitTags,
      recruitId,
      title,
      star,
      likes,
      views,
      sex,
      heartLimit,
      ageGroup,
      // recruitStatus,
      applies,
      minRequire,
      require,
      date,
      memberId,
      nickname,
      authorHeart,
      authorLocation,
      location,
      filePath,
    },
  } = props;
  const { tagName, emoji } = recruitTags[0];

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
      color = 'var(--neon-green)';
    } else if (apply.length >= minimum) {
      msg = '최소인원이 충족되었습니다!';
      color = 'var(--neon-blue)';
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
          value={tagName}
          emoji={emoji}
          to={`/recruits?tag="${tagName}"`}
          onClick={() => {
            setFilterTag(tagName);
          }}
        />
        <ListTitle to={`/recruit/${recruitId}`}>{title}</ListTitle>
      </div>
      <div>
        <ListInfo>
          <div>
            <div>
              <i className="fa-solid fa-heart" />
              {likes}
            </div>
            <div>
              <i className="fa-solid fa-eye" />
              {views}
            </div>
            {star ? (
              <div>
                <i className="fa-solid fa-star" />
                {star}
              </div>
            ) : (
              ''
            )}
          </div>
          <CreatorCard
            memberId={memberId}
            nickname={nickname}
            heart={authorHeart}
            image={filePath}
            authorLocation={authorLocation}
          />
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
              <span>{`${heartLimit} 이상`}</span>
            </div>
            <div>
              <span>나이대</span>
              {classifyingAge(ageGroup).map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
            <div>
              <span>위치</span>
              <div>{location}</div>
            </div>
          </div>
          <div>
            <div>
              <div>인원</div>
              <div>
                <h4>
                  {/* <ProfileImgContainer>
                    {applies.map((el, i) => (
                      <ProfileImg
                        key={el.memberId}
                        img-id={i + 1}
                        src={`https://picsum.photos/seed/${el.memberId}/20/20.webp`}
                        alt={`avatar of ${el.nickname}`}
                      />
                    ))}
                  </ProfileImgContainer> */}
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
