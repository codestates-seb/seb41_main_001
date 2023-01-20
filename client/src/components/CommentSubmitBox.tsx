import styled from 'styled-components';
import { useState } from 'react';
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
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommentSubmitBox = ({ value = '', onClick }: CommentSubmitProps) => {
  const [comment, setComment] = useState(value);

  return (
    <SubmitContainter
      //  TODO: onSubmit에 댓글등록 api.
      onSubmit={(e: any) => {
        e.preventDefault();
        console.log('댓글 등록!');
      }}
    >
      <textarea
        required
        maxLength={500}
        value={comment}
        placeholder="댓글을 작성해주세요"
        onChange={(e) => setComment(e.target.value)}
      />
      {/* // TODO: onClick에 댓글등록 api. */}
      <Button
        value="댓글 등록"
        onClick={(e: any) => {
          e.preventDefault();
          console.log(comment);
          onClick(e);
        }}
        type="submit"
      />
    </SubmitContainter>
  );
};

export default CommentSubmitBox;
