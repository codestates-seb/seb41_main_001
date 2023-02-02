import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Tag = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  > a:first-child {
    text-decoration: none;
    color: white;
    padding: 3px 6px 6px 6px;
    background-color: gray;
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    &:hover {
      color: var(--neon-yellow);
      transition: 0.2s ease-in-out;
    }
  }
  > div:last-child {
    width: 100%;
    text-align: right;
  }
`;

interface TagProps {
  tagName: string;
  emoji?: string;
  tagCount: number;
  board: string;
}
const TagCounter = ({ tagName, emoji, tagCount, board }: TagProps) => (
  <Tag>
    {board === 'recruits' ? (
      <Link to={`/${board}?tag="${tagName}"`} onClick={() => {}}>
        {emoji ? `${emoji} ${tagName}` : `${tagName}`}
      </Link>
    ) : (
      <Link to={`/${board}?type=tag&keyword=${tagName}`} onClick={() => {}}>
        {emoji ? `${emoji} ${tagName}` : `${tagName}`}
      </Link>
    )}
    <div>{`${tagCount}개의 게시물`}</div>
  </Tag>
);

export default TagCounter;
