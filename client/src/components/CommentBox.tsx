import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import timeDifference from '../utils/timeDifference';
import Button from './Button';
import CommentSubmitBox from './CommentSubmitBox';

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
    font-size: 100%;

    > div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div:first-child {
        display: flex;
        align-items: center;
        > div:nth-child(2) {
          margin-left: 10px;
          padding: 5px;
          background-color: var(--neon-blue);
          border-radius: 7px;
          font-size: 80%;
        }
      }
      > div:last-child {
        span {
          font-size: 90%;
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

const CommentBox = (props: { memberId: number; data: CommentProps }) => {
  const {
    memberId: creatorId,
    data: { memberId, nickname, heart, body, createdAt, modifiedAt },
  } = props;

  const LOGIN_ID = 1;

  const [modifying, setModifying] = useState(false);

  return (
    <CommentContainer>
      <CreatorBox>
        <Link to={`/users/${memberId}/${nickname}`}>
          <img
            src={`https://picsum.photos/seed/${memberId}/50/50.webp`}
            alt={`avator of ${nickname}}`}
          />
          <div>
            <div>
              <div>{nickname}</div>
              {creatorId === memberId ? <div>글쓴이</div> : ''}
            </div>
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
              {modifying === false ? (
                <Button value="수정" onClick={() => setModifying(true)} />
              ) : (
                <Button value="닫기" onClick={() => setModifying(false)} />
              )}
              {/* // TODO: 댓글삭제 api. */}
              <Button
                value="삭제"
                onClick={() => {
                  console.log('댓글삭제!');
                }}
              />
            </>
          ) : (
            ''
          )}
        </div>
      </CreatorBox>
      {modifying === false ? (
        <div>{body}</div>
      ) : (
        // TODO: onClick에 댓글수정 api
        <CommentSubmitBox
          value={body}
          onClick={() => {
            console.log('댓글수정!');
            setModifying(false);
          }}
        />
      )}
    </CommentContainer>
  );
};

export default CommentBox;
