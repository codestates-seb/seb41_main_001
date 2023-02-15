import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';
import RecruitDataProps from '../interfaces/RecruitDataProps';

const CreatorSelectBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

interface ApplicantsDataProps {
  applies: { memberId: number; nickname: string; heart: number }[];
  modifiedAt: string;
  setData: (value: RecruitDataProps) => void;
}

const RecruitCreatorSelectBox = ({
  applies,
  modifiedAt,
  setData,
}: ApplicantsDataProps) => {
  const navigate = useNavigate();
  const { recruitId } = useParams();

  // const LOGIN_ID = Number(localStorage.getItem('memberId'));
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = useSelector((state: any) => state.memberId);

  const checkIfBringUpPossible = (d: string) => {
    const TIME_MODIFIED = new Date(d).getTime();
    const TIME_NOW = new Date().getTime();
    if (TIME_NOW - TIME_MODIFIED > 24 * 60 * 60 * 1000) return true;
    return false;
  };

  const handleDeleteRecruit = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`, {
        data: {
          memberId,
        },
      })
      .then(() => navigate(`/recruits`))
      .catch((err) => console.log(err));
  };

  const handleBringupRecruit = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/bringup`,
        {},
        {
          headers: {
            Authorization: accessToken,
            Refresh: refreshToken,
          },
        },
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  return (
    <CreatorSelectBox>
      <ButtonLink
        value="수정"
        to={`/recruit/${recruitId}/edit`}
        icon={<i className="fa-solid fa-pen-to-square" />}
      />
      <Button
        value="삭제"
        onClick={handleDeleteRecruit}
        disabled={applies.length >= 1}
        icon={<i className="fa-solid fa-trash" />}
      />
      <Button
        value="끌어올리기"
        onClick={handleBringupRecruit}
        disabled={!checkIfBringUpPossible(modifiedAt)}
        icon={<i className="fa-solid fa-circle-up" />}
      />
    </CreatorSelectBox>
  );
};

export default RecruitCreatorSelectBox;

// 글쓴 사람이 할 수 있는 것. 모집글 수정, 삭제, 끌올
// 글쓴 사람이 아니면 디폴트로 좋아요 버튼만 노출
