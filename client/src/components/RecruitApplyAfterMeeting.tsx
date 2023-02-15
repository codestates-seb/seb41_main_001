/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import classifyingStatus from '../utils/classifyingStatus';
import maskingNickname from '../utils/maskingNickname';
import Button from './Button';
import RecruitReviewModal from './RecruitReviewModal';

const SelectContainer = styled.div`
  display: flex;
  > div:nth-child(2) {
    margin: 0px 20px;
  }
  margin-bottom: 40px;
`;

const SelectBox = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid white;
  border-radius: 20px;
  > h3 {
    margin-top: -10px;
    text-align: center;
    width: 100%;
    > span {
      background-color: var(--gray);
      padding: 20px;
    }
  }
  ul {
    padding-right: 20px;
    line-height: 130%;
    font-size: 100%;
    li {
      margin-bottom: 10px;
    }
  }
`;

const ApplicantsBox = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 0px;
  > div:nth-child(1) {
    font-size: 120%;
    font-weight: bold;
    i {
      margin-right: 10px;
    }
  }
  > h2 {
    margin-bottom: 10px;
    span {
      font-size: 1rem;
      margin-left: 10px;
      font-weight: normal;
    }
  }
  > div:last-child {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileImg = styled.div`
  position: relative;
  img {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    &:hover {
      + div {
        display: block;
      }
    }
  }
`;

const Bubble = styled.div`
  display: none;
  position: absolute;
  top: -140%;
  left: 50%;
  transform: translate(-50%, 0%);
  .bubble {
    position: relative;
    background: #ffffff;
    color: #000000;
    font-family: Arial;
    font-size: 14px;
    box-shadow: 0px 0px 20px 10px rgba(163, 163, 163, 0.42);
    text-align: center;
    border-radius: 5px;
    padding: 5px 7px;
  }
  .bubble:after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    z-index: 1;
    border-style: solid;
    border-color: #ffffff transparent;
    border-width: 5px 5px 0;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
  }
`;

const ApplyBox = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 20px;
  padding-top: 0px;
  > div {
    font-size: 120%;
    word-break: keep-all;
    line-height: 150%;
  }
  > button {
    font-size: 150%;
    font-weight: bold;
  }
`;

const ReviewBox = styled.div`
  .fa-star {
    color: #ffc107;
  }
  height: 170px;
  padding: 0px 20px 20px 20px;
  overflow: auto;
  > div:nth-child(1) {
    margin-bottom: 12px;
    i {
      margin-right: 3px;
    }
    > span:nth-child(2) {
      font-weight: bold;
    }
    > span:nth-child(3) {
      margin-left: 7px;
      font-size: 14px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      font-size: 12px;
      a {
        text-decoration: none;
        color: white;
        display: flex;
        > img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        > div {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-bottom: 7px;

          > div:first-child {
            > span:nth-child(1) {
              margin-right: 5px;
            }
            > span:nth-child(2) {
              color: var(--neon-red);
              font-size: 12px;
              i {
                margin-right: 2px;
              }
            }
          }
        }
      }
    }
  }
`;

interface ReviewConditionProps {
  recruitStatus: '모집중' | '최소인원충족' | '모집완료' | '활동종료';
  applies: {
    memberId: number;
    nickname: string;
    heart: number;
    filePath?: string;
  }[];
  minRequire: number;
  require: number;
  applicantsId: number[];
  creatorId: number;
  reviews: {
    reviewId: number;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    star: number;
    filePath?: string;
  }[];
  creatorNickname: string;
  setData: any;
}

const RecruitApplyAfterMeeting = ({
  recruitStatus,
  applies,
  minRequire,
  require,
  applicantsId,
  creatorId,
  reviews,
  creatorNickname,
  setData,
}: ReviewConditionProps) => {
  const { recruitId } = useParams();
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  // const LOGIN_ID = Number(localStorage.getItem('memberId')) || -1;
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = Number(useSelector((state: any) => state.memberId));
  const REVIEW_STAR_NUM = reviews.reduce((res: number[], ele) => {
    res.push(ele.star);
    return res;
  }, []);

  const REVIEW_STAR_AVER = (
    REVIEW_STAR_NUM.reduce((r, e) => r + e, 0) / REVIEW_STAR_NUM.length
  ).toFixed(2);

  const REVIEW_ID = reviews.reduce((res: number[], ele) => {
    res.push(ele.memberId);
    return res;
  }, []);

  return (
    <SelectContainer>
      {reviewModal ? (
        <RecruitReviewModal
          creatorId={creatorId}
          creatorNickname={creatorNickname}
          applies={applies}
          setReviewModal={setReviewModal}
          setData={setData}
        />
      ) : (
        ''
      )}
      <SelectBox>
        <h3>
          <span>모집인원</span>
        </h3>
        <ApplicantsBox>
          <div style={{ color: classifyingStatus(recruitStatus).color }}>
            <i className={classifyingStatus(recruitStatus).icon} />
            {recruitStatus}
          </div>
          <h2>
            {`${applies.length}`}
            <span>{`/${require}명`}</span>
          </h2>
          <div>{`(최소인원 ${minRequire}명)`}</div>
          <div>
            {applies.map((el) => (
              <ProfileImg key={el.memberId}>
                <img
                  src={
                    el.filePath
                      ? `${el.filePath}`
                      : `https://picsum.photos/seed/${el.memberId}/20/20.webp`
                  }
                  alt={`avatar of ${maskingNickname(el.nickname)}`}
                />
                <Bubble>
                  <div className="bubble">{maskingNickname(el.nickname)}</div>
                </Bubble>
              </ProfileImg>
            ))}
          </div>
        </ApplicantsBox>
        <div />
      </SelectBox>
      {[...applicantsId, creatorId].includes(memberId) &&
      recruitStatus !== '모집중' ? (
        <SelectBox>
          {['최소인원충족', '모집완료'].includes(recruitStatus) ? (
            <>
              <h3>
                <span>활동종료변경</span>
              </h3>
              <ApplyBox>
                <div>활동이 종료되었나요?</div>
                <Button
                  value="활동 종료"
                  onClick={() => {
                    axios
                      .patch(
                        `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/status`,
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
                      })
                      .catch((err) => console.log(err));
                  }}
                />
              </ApplyBox>
            </>
          ) : (
            <>
              <h3>
                <span>리뷰작성</span>
              </h3>
              <ApplyBox>
                {!REVIEW_ID.includes(memberId) ? (
                  <>
                    <div>리뷰를 작성하시겠습니까?</div>
                    <Button
                      value="리뷰 작성"
                      onClick={() => setReviewModal(true)}
                    />
                  </>
                ) : (
                  <>
                    <div>리뷰 작성이 완료되었습니다</div>
                    <Button value="리뷰 완료" disabled onClick={() => {}} />
                  </>
                )}
              </ApplyBox>
            </>
          )}
        </SelectBox>
      ) : (
        <SelectBox>
          <h3>
            <span>모집신청</span>
          </h3>
          <ApplyBox>
            <div>활동이 종료되었습니다</div>
            <Button value="신청 불가" disabled onClick={() => {}} />
          </ApplyBox>
        </SelectBox>
      )}
      {recruitStatus === '활동종료' ? (
        <SelectBox>
          <h3>
            <span>리뷰내역</span>
          </h3>
          <ReviewBox>
            <div>
              {reviews.length ? (
                <>
                  <i className="fa-solid fa-star" />
                  <span>{`${REVIEW_STAR_AVER}`}</span>
                  <span>{`총 ${reviews.length}개의 리뷰`}</span>
                </>
              ) : (
                <span>아직 리뷰가 작성되지 않았습니다</span>
              )}
            </div>
            <ul>
              {reviews.map((el) => (
                <li key={el.reviewId}>
                  <Link to={`/members/${el.memberId}`}>
                    <img
                      src={
                        el.filePath
                          ? `${el.filePath}`
                          : `https://picsum.photos/seed/${el.memberId}/50/50.webp`
                      }
                      alt={`avatar of ${el.nickname}`}
                    />
                    <div>
                      <div>
                        <span>{el.nickname}</span>
                        <span>
                          <i className="fa-solid fa-heart" />
                          {el.heart}
                        </span>
                      </div>
                      <div>
                        {[...Array(el.star)].map((e, i) => (
                          <i className="fa-solid fa-star" key={i + 1} />
                        ))}
                      </div>
                    </div>
                  </Link>
                  {el.body}
                </li>
              ))}
            </ul>
          </ReviewBox>
        </SelectBox>
      ) : (
        <SelectBox>
          <h3>
            <span>유의사항</span>
          </h3>
          <div>
            <ul>
              <li>조건이 충족되지 못하면 신청이 불가합니다</li>
              <li>모집이 완료된 뒤에는 모임 전이라도 취소가 불가합니다</li>
              <li>신중한 모임 참가 부탁드릴게요!</li>
            </ul>
          </div>
        </SelectBox>
      )}
    </SelectContainer>
  );
};

export default RecruitApplyAfterMeeting;

// 모임에 참여한 사람만 할 수 있는 것. 최소인원충족모집글 상태 변경(모임시간이 지났다면 활동종료버튼활성화 => 누르면 리뷰작성버튼 노출), 모집글 리뷰 작성.
// 모임시간 후 => 모임이 성사X: 모임시간이 지났지만 최소인원충족에 실패했다면 "활동취소" 성사O :
