import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonContainer = styled(Link)`
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 8px 14px;
  transition: 0.2s ease-in-out;
  font-size: 100%;
  white-space: nowrap;
  i {
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--neon-yellow);
    border: 1px solid var(--neon-yellow);
    color: black;
    transition: 0.2s ease-in-out;
  }
`;

interface ButtonProps {
  value: string;
  to: string;
  icon?: JSX.Element;
}

const ButtonLink = ({ value, to, icon }: ButtonProps) => (
  <ButtonContainer to={to}>
    {icon}
    {value}
  </ButtonContainer>
);

export default ButtonLink;
