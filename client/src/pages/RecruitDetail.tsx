import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
        width: 100%;
        &:nth-child(2) {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 400px;
        }
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
  const { recruitId } = useParams();
  const [data, setData] = useState<RecruitDataProps>();
  const [likesMemberId, setLikesMemberId] = useState<number[]>();
  const [applicantsId, setApplicantsId] = useState<number[]>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`)
      .then((res) => {
        setData(res.data.data);
        setLikesMemberId(
          res.data.data.recruitLikes.reduce((r: number[], e: any) => {
            if (e.memberId) {
              r.push(e.memberId);
            }
            return r;
          }, []),
        );
        setApplicantsId(
          res.data.data.applies.reduce((r: number[], e: any) => {
            if (e.memberId) {
              r.push(e.memberId);
            }
            return r;
          }, []),
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data) {
      setLikesMemberId(
        data.recruitLikes.reduce((r: number[], e: any) => {
          if (e.memberId) {
            r.push(e.memberId);
          }
          return r;
        }, []),
      );
      setApplicantsId(
        data.applies.reduce((r: number[], e: any) => {
          if (e.memberId) {
            r.push(e.memberId);
          }
          return r;
        }, []),
      );
    }
  }, [data]);

  // const LOGIN_ID = Number(localStorage.getItem('memberId'));
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = Number(useSelector((state: any) => state.memberId));

  const checkIfMeetingEnded = (d: string) => {
    const TIME_INPUT = new Date(d).getTime();
    const TIME_NOW = new Date().getTime();

    if (TIME_INPUT < TIME_NOW) return true; // Meeting Ended.
    return false; // Meeting Yet.
  };

  return (
    <MainContainer>
      {data && (
        <>
          <h1>{data.title}</h1>
          <div>
            <div>
              <span>
                <i className="fa-regular fa-clock" />
                {`${modifyingDate(data.modifiedAt)}`}
              </span>
              <span>
                <i className="fa-solid fa-eye" />
                {data.views}
              </span>
            </div>
            <CreatorCard
              memberId={data.memberId}
              nickname={data.nickname}
              heart={data.authorHeart}
              authorLocation={data.authorLocation}
              image={data.filePath}
            />
          </div>
          <ContentBox>{data.body}</ContentBox>
          <LocationBox>
            <div>
              <span>{`📌 언제? ${modifyingDate(data.date)}`}</span>
              <span>{`📌 어디서? ${data.location}`}</span>
              <span>📌 조건</span>
              <ConditionBox>
                <div>
                  <i className={`${classifyingGender(data.sex).icon}`} />
                  {classifyingGender(data.sex).text}
                </div>
                <div>
                  <i className="fa-solid fa-heart-circle-exclamation" />
                  <span>{`심박수 ${data.heartLimit} 이상`}</span>
                </div>
                <div>
                  <span>신청 가능 연령</span>
                  {classifyingAge(data.ageGroup).map((el) => (
                    <span key={el}>{el}</span>
                  ))}
                </div>
              </ConditionBox>
            </div>
            <div>
              <KakaoMap
                latitude={data.lat}
                longitude={data.lon}
                overlayvalue="모임 장소"
              />
            </div>
          </LocationBox>
          {!checkIfMeetingEnded(data.date) ? (
            <RecruitApplyBeforeMeeting
              applicantsId={applicantsId!}
              heartCond={data.heartLimit}
              ageGroup={data.ageGroup}
              sexCon={data.sex}
              recruitStatus={data.recruitStatus}
              creatorId={data.memberId}
              applies={data.applies}
              minRequire={data.minRequire}
              require={data.require}
              setData={setData}
            />
          ) : (
            <RecruitApplyAfterMeeting
              recruitStatus={data.recruitStatus}
              applies={data.applies}
              minRequire={data.minRequire}
              require={data.require}
              applicantsId={applicantsId!}
              creatorId={data.memberId}
              reviews={data.reviews}
              creatorNickname={data.nickname}
              setData={setData}
            />
          )}
          <ButtonArea>
            <LikeButton
              likes={likesMemberId!.includes(memberId)}
              value={`좋아요 ${data.likes}`}
              onClick={() => {
                if (memberId) {
                  axios
                    .patch(
                      `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/likes`,
                      { memberId },
                      {
                        headers: {
                          Authorization: accessToken,
                          Refresh: refreshToken,
                        },
                      },
                    )
                    .then((res) => {
                      setData(res.data.data);
                      setLikesMemberId(
                        res.data.data.recruitLikes.reduce(
                          (r: number[], e: any) => {
                            if (e.memberId) {
                              r.push(e.memberId);
                            }
                            return r;
                          },
                          [],
                        ),
                      );
                    })
                    .catch((err) => console.log(err));
                }
              }}
              icon={<i className="fa-solid fa-heart" />}
            />

            {data.memberId === memberId ? (
              <RecruitCreatorSelectBox
                applies={data.applies}
                modifiedAt={data.modifiedAt}
                setData={setData}
              />
            ) : (
              ''
            )}
          </ButtonArea>
          <CommentArea>
            <h3>{`${data.recruitComments.length}개의 댓글이 있습니다`}</h3>
            <ul>
              {data.recruitComments.map((el) => (
                <CommentBox
                  key={el.recruitCommentId}
                  commentId={el.recruitCommentId}
                  memberId={data.memberId}
                  board="recruits"
                  boardId={data.recruitId}
                  applicantsId={applicantsId!}
                  data={el}
                  setData={setData}
                  image={el.filePath}
                />
              ))}
            </ul>
            <CommentSubmitBox
              submitComment={`/recruits/${data.recruitId}`}
              setData={setData}
            />
          </CommentArea>
        </>
      )}
    </MainContainer>
  );
};

export default RecruitDetail;
