import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import classifyingStatus from '../utils/classifyingStatus';
import Button from './Button';
import maskingNickname from '../utils/maskingNickname';

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

interface ApplyConditionProps {
  applicantsId: number[];
  heartCond: number;
  ageGroup: string[];
  sexCon: 'Male' | 'Female' | 'Both';
  recruitStatus: '모집중' | '최소인원충족' | '모집완료' | '활동종료';
  creatorId: number;
  applies: {
    memberId: number;
    nickname: string;
    heart: number;
    filePath?: string;
  }[];
  minRequire: number;
  require: number;
  setData: any;
}

const RecruitApplyBeforeMeeting = ({
  applicantsId,
  heartCond,
  ageGroup,
  sexCon,
  recruitStatus,
  creatorId,
  applies,
  minRequire,
  require,
  setData,
}: ApplyConditionProps) => {
  const navigate = useNavigate();
  // const LOGIN_INFO = {
  //   memberId: useSelector((state: any) => state.memberId),
  //   heart: useSelector((state: any) => state.heart),
  //   birth: useSelector((state: any) => state.birth),
  //   sex: useSelector((state: any) => state.sex),
  //   // memberId: Number(localStorage.getItem('memberId')),
  //   // heart: Number(localStorage.getItem('heart')),
  //   // birth: localStorage.getItem('birth'),
  //   // sex: localStorage.getItem('sex'),
  // };
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = useSelector((state: any) => state.memberId);
  const birth = useSelector((state: any) => state.birth);
  const heart = useSelector((state: any) => state.heart);
  const sex = useSelector((state: any) => state.sex);

  const { recruitId } = useParams();

  const calculateAge = (d: string) => {
    const TODAY = new Date();
    const BIRTHDATE = new Date(d);
    let AGE = TODAY.getFullYear() - BIRTHDATE.getFullYear();
    const M = TODAY.getMonth() - BIRTHDATE.getMonth();
    if (M < 0 || (M === 0 && TODAY.getDate() < BIRTHDATE.getDate())) {
      AGE -= 1;
    }
    return `${Math.floor(AGE / 10)}0`;
  };

  const isValidForApply = () => {
    if (recruitStatus === '모집완료') {
      return '정원이 초과되었습니다';
    }
    if (sexCon !== sex && sexCon !== 'Both') {
      return '성별조건에 부합하지 않습니다';
    }
    if (heartCond > heart) {
      return '심박수조건에 부합하지 않습니다';
    }
    if (!ageGroup.includes(calculateAge(birth))) {
      return '연령조건에 부합하지 않습니다';
    }
    return true;
  };

  return (
    <SelectContainer>
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
              <ProfileImg>
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
      <SelectBox>
        <h3>
          <span>모집신청</span>
        </h3>
        {creatorId === memberId ? (
          <ApplyBox>
            <div>자기 자신이 쓴 글에는 신청하실 수 없습니다</div>
            <Button value="신청 불가" disabled onClick={() => {}} />
          </ApplyBox>
        ) : (
          <div>
            {!applicantsId.includes(memberId) ? (
              <ApplyBox>
                <div>
                  {isValidForApply() === true
                    ? '모임에 참여하시겠습니까?'
                    : `${isValidForApply()}`}
                </div>
                <Button
                  value="신청"
                  disabled={isValidForApply() !== true}
                  onClick={() => {
                    if (memberId && memberId !== -1) {
                      axios
                        .patch(
                          `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/application`,
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
                    } else {
                      navigate('/login');
                    }
                  }}
                />
              </ApplyBox>
            ) : (
              <ApplyBox>
                <div>
                  {recruitStatus !== '모집완료'
                    ? '모임 참여를 취소하시겠습니까?'
                    : '모집완료가 된 이후에는 취소하실 수 없습니다'}
                </div>
                <Button
                  value="취소"
                  disabled={recruitStatus === '모집완료'}
                  onClick={() => {
                    axios
                      .patch(
                        `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/application`,
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
            )}
          </div>
        )}
      </SelectBox>
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
    </SelectContainer>
  );
};

export default RecruitApplyBeforeMeeting;

// 모임시간 전 => 모집완료전 : 모집글 신청/취소 모집완료후: 신청 및 취소 불가능. 유의사항에 표시할 것.
// 모임시간 후 => 모임이 성사X: 모임시간이 지났지만 최소인원충족에 실패했다면 "활동취소"
// 성사O: 모임시간이 지났다면 활동종료버튼 활성화 => 방장 포함 참여한 사람이면 누구나 누를 수 있음. => 누르면 활동종료로 바뀜
// 방장 및 참여자에게 리뷰버튼 활성화 => 모달 생성 => 작성 후 제출
// 그 외의 사람에게는 뭐라고 노출시키지.. 그냥 disabled 해야게다.
