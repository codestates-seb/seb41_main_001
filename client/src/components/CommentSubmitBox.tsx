import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  value?: string;
  submitComment: string;
  setModifying?: (value: boolean) => void;
  setData: any;
}

const CommentSubmitBox = ({
  value = '',
  submitComment,
  setModifying,
  setData,
}: CommentSubmitProps) => {
  const [comment, setComment] = useState(value);
  // const LOGIN_ID = localStorage.getItem('memberId') || -1;
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const memberId = useSelector((state: any) => state.memberId);
  const navigate = useNavigate();
  const handleCommentSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (comment.trim() !== '' && setModifying) {
      // 댓글을 수정하는 경우
      console.log(
        `PATCH ${process.env.REACT_APP_API_URL}${submitComment}`,
        comment,
      );
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}${submitComment}`,
          {
            body: comment,
            memberId,
          },
          {
            headers: {
              Authorization: accessToken,
              Refresh: refreshToken,
            },
          },
        )
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
      setModifying(false);
    } else if (comment.trim() !== '') {
      // 댓글을 등록하는 경우
      console.log(`POST ${submitComment}`, comment);
      if (memberId && Number(memberId) !== -1) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}${submitComment}`,
            {
              body: comment,
              memberId,
            },
            {
              headers: {
                Authorization: accessToken,
                Refresh: refreshToken,
              },
            },
          )
          .then((res) => {
            console.log(res);
            setData(res.data.data);
          })
          .catch((err) => console.log(err));
        setComment('');
      } else {
        navigate('/login');
      }
    }
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
