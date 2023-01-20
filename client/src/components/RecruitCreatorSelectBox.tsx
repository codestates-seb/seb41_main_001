import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';

const CreatorSelectBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

interface ApplicantsDataProps {
  applies: { memberId: number; nickname: string; heart: number }[];
}
const RecruitCreatorSelectBox = ({ applies }: ApplicantsDataProps) => {
  const { recruitId } = useParams();

  return (
    <CreatorSelectBox>
      <ButtonLink
        value="수정"
        to={`/recruit/${recruitId}/edit`}
        icon={<i className="fa-solid fa-pen-to-square" />}
      />
      {/* // TODO: 모집글 삭제, 끌올 api. */}
      <Button
        value="삭제"
        onClick={() => console.log('글 삭제!')}
        disabled={applies.length >= 1}
        icon={<i className="fa-solid fa-trash" />}
      />
      <Button
        value="끌어올리기"
        onClick={() => console.log('글 끌올!')}
        icon={<i className="fa-solid fa-circle-up" />}
      />
    </CreatorSelectBox>
  );
};

export default RecruitCreatorSelectBox;

// 글쓴 사람이 할 수 있는 것. 모집글 수정, 삭제, 끌올
// 글쓴 사람이 아니면 디폴트로 좋아요 버튼만 노출
