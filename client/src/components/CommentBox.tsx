import styled from 'styled-components';
import CreatorMiniCard from './CreatorMiniCard';
import modifyingDate from '../utils/modifyingDate';

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: 1px solid white;
  > div:first-child {
    margin-right: 15px;
    width: 130px;
    flex: none;
  }
  > div:last-child {
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    line-height: 120%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div:last-child {
      text-align: right;
      font-size: 0.7rem;
    }
  }
`;

interface CommentProps {
  memberId: number;
  nickname: string;
  heart: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
}

const CommentBox = (props: { data: CommentProps }) => {
  const {
    data: { memberId, nickname, heart, body, createdAt, modifiedAt },
  } = props;

  return (
    <CommentContainer>
      <CreatorMiniCard memberId={memberId} nickname={nickname} heart={heart} />
      <div>
        <div>{body}</div>
        <div>
          {createdAt === modifiedAt
            ? `${modifyingDate(createdAt)} 작성`
            : `${modifyingDate(modifiedAt)} 수정`}
        </div>
      </div>
    </CommentContainer>
  );
};

export default CommentBox;
