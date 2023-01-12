import styled from 'styled-components';

const ButtonContainer = styled.button`
  text-decoration: none;
  background-color: var(--gray);
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 8px 14px;
  transition: 0.2s ease-in-out;
  font-size: 16px;
  white-space: nowrap;
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
  onClick: () => void;
}

const Button = ({ value, onClick }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>{value}</ButtonContainer>
);

export default Button;
