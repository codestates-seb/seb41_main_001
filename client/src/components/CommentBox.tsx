import styled from 'styled-components';
import { Link } from 'react-router-dom';
import timeDifference from '../utils/timeDifference';
import Button from './Button';

const CommentContainer = styled.li`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  > div:first-child {
    margin-bottom: 10px;
  }
  > div:last-child {
    line-height: 150%;
  }
`;

const CreatorBox = styled.div`
  padding: 0px 15px 10px 15px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  a {
    img {
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      margin-right: 15px;
    }
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 16px;

    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div:last-child {
        span {
          font-size: 14px;
          font-weight: 400;
          &:first-child {
            color: var(--neon-red);
            margin-right: 12px;
            i {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
  > div {
    button {
      margin-left: 10px;
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

  const LOGIN_ID = 1;

  return (
    <CommentContainer>
      <CreatorBox>
        <Link to={`/users/${memberId}/${nickname}`}>
          <img
            src={`https://picsum.photos/seed/${memberId}/50/50.webp`}
            alt={`avator of ${nickname}}`}
          />
          <div>
            <div>{nickname}</div>
            <div>
              <span>
                <i className="fa-solid fa-heart" />
                {heart}
              </span>
              <span>
                {createdAt === modifiedAt
                  ? `${timeDifference(createdAt)} 작성`
                  : `${timeDifference(modifiedAt)} 수정`}
              </span>
            </div>
          </div>
        </Link>
        <div>
          {memberId === LOGIN_ID ? (
            <>
              <Button value="수정" onClick={() => {}} />
              <Button value="삭제" onClick={() => {}} />
            </>
          ) : (
            ''
          )}
        </div>
      </CreatorBox>
      <div>{body}</div>
    </CommentContainer>
  );
};

export default CommentBox;
