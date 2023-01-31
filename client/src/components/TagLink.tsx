import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TagContainer = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  height: 35px;
  white-space: nowrap;
  margin-right: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    color: var(--neon-yellow);
    transition: 0.2s ease-in-out;
  }
`;

interface TagProps {
  value: string;
  to: string;
  onClick: (e: React.SyntheticEvent) => void;
}

const TagLink = ({ value, to, onClick }: TagProps) => (
  <TagContainer to={to} onClick={(e: any) => onClick(e)}>
    {value}
  </TagContainer>
);

export default TagLink;
