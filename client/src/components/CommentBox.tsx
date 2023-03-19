import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
      width: 50px;
      height: 50px;
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

const CreatorMark = styled.div`
  margin-left: 10px;
  padding: 5px;
  background-color: var(--neon-blue);
  border-radius: 7px;
  font-size: 80%;
`;

const ApplicantMark = styled(CreatorMark)`
  background-color: var(--neon-red);
`;

interface CommentProps {
  recruitCommentId?: number;
  freeCommentId?: number;
  memberId: number;
  nickname: string;
  heart: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
}

const CommentBox = (props: {
  commentId: number;
  memberId: number;
  board: string;
  boardId: number;
  applicantsId?: number[];
  data: CommentProps;
  setData: any;
  image?: string;
}) => {
  const {
    commentId,
    memberId: creatorId,
    board,
    boardId,
    applicantsId,
    data: { memberId, nickname, heart, body, createdAt, modifiedAt },
    setData,
    image,
  } = props;

  // const LOGIN_ID = Number(localStorage.getItem('memberId'));
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const storedMemberId = Number(useSelector((state: any) => state.memberId));

  const [modifying, setModifying] = useState<boolean>(false);

  const handleCommentDelete = () => {
    console.log(`DELETE /${board}/${boardId}/${commentId}`);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/${board}/${boardId}/${commentId}`,
        {
          headers: {
            Authorization: accessToken,
            Refresh: refreshToken,
          },
          data: { memberId: storedMemberId },
        },
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      });
  };

  console.log(creatorId, memberId);

  return (
    <CommentContainer>
      <CreatorBox>
        <Link to={`/members/${memberId}`}>
          <img
            src={
              image
                ? `${image}`
                : `https://picsum.photos/seed/${memberId}/50/50.webp`
            }
            alt={`avator of ${nickname}}`}
          />
          <div>
            <div>
              <div>{nickname}</div>
              {creatorId === memberId ? <CreatorMark>글쓴이</CreatorMark> : ''}
              {applicantsId && applicantsId.includes(memberId) ? (
                <ApplicantMark>참여자</ApplicantMark>
              ) : (
                ''
              )}
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
          {memberId === storedMemberId ? (
            <>
              {modifying === false ? (
                <Button value="수정" onClick={() => setModifying(true)} />
              ) : (
                <Button value="닫기" onClick={() => setModifying(false)} />
              )}
              <Button value="삭제" onClick={handleCommentDelete} />
            </>
          ) : (
            ''
          )}
        </div>
      </CreatorBox>
      {modifying === false ? (
        <div>{body}</div>
      ) : (
        <CommentSubmitBox
          value={body}
          submitComment={`/${board}/${boardId}/${commentId}`}
          setModifying={setModifying}
          setData={setData}
        />
      )}
    </CommentContainer>
  );
};

export default CommentBox;
