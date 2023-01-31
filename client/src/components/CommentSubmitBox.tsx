import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';

const SubmitContainter = styled.form`
  width: 100%;
  display: flex;
  textarea {
    width: 100%;
    height: 120px;
    margin-right: 20px;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    font-size: 100%;
    padding: 10px;
    &::placeholder {
      font-size: 100%;
    }
  }
  button {
    white-space: nowrap;
  }
`;

// TODO: handleCommentSubmit props로 받을 것.

interface CommentSubmitProps {
  commentId?: number;
  value?: string;
  submitComment: string;
  setModifying?: (value: boolean) => void;
}

const CommentSubmitBox = ({
  commentId,
  value = '',
  submitComment,
  setModifying,
}: CommentSubmitProps) => {
  const [comment, setComment] = useState(value);
  const LOGIN_ID = localStorage.getItem('memberId');
  const { recruitId } = useParams();
  const handleCommentSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (setModifying) {
      // 댓글을 수정하는 경우
      console.log(`PATCH ${submitComment}`, comment);
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/${commentId}`,
          {
            body: comment,
            memberId: LOGIN_ID,
          },
          {
            headers: {
              Authorization: localStorage.getItem('AccessToken'),
              Refresh: localStorage.getItem('RefreshToken'),
            },
          },
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setModifying(false);
    } else {
      // 댓글을 등록하는 경우
      console.log(`POST ${submitComment}`, comment);
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/recruits/${recruitId}`,
          {
            body: comment,
            memberId: LOGIN_ID,
          },
          {
            headers: {
              Authorization: localStorage.getItem('AccessToken'),
              Refresh: localStorage.getItem('RefreshToken'),
            },
          },
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    setComment('');
  };

  return (
    <SubmitContainter onSubmit={handleCommentSubmit}>
      <textarea
        required
        maxLength={500}
        value={comment}
        placeholder="댓글을 작성해주세요"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button value="댓글 등록" onClick={handleCommentSubmit} type="submit" />
    </SubmitContainter>
  );
};

export default CommentSubmitBox;
