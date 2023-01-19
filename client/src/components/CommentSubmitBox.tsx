import styled from 'styled-components';
import Button from './Button';

const SubmitContainter = styled.form`
  width: 100%;
  display: flex;
  padding: 20px;
  textarea {
    width: 100%;
    height: 120px;
    margin-right: 20px;
    background-color: var(--gray);
    color: white;
    font-size: 100%;
    padding: 10px;
  }
  button {
    white-space: nowrap;
  }
`;

// TODO: handleCommentSubmit props로 받을 것.
const CommentSubmitBox = () => (
  <SubmitContainter onSubmit={() => {}}>
    <textarea placeholder="로그인 후 작성하실 수 있습니다" />
    <Button value="댓글 등록" onClick={() => {}} type="submit" />
  </SubmitContainter>
);

export default CommentSubmitBox;
