import styled from 'styled-components';

const ButtonContainer = styled.button`
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
  &:disabled {
    color: gray;
    border: 1px solid gray;
    &:hover {
      cursor: default;
      background-color: rgba(255, 255, 255, 0);
    }
  }
`;

interface ButtonProps {
  value: string;
  onClick: (e: React.SyntheticEvent) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  icon?: JSX.Element;
}

const Button = ({
  value,
  onClick,
  type,
  disabled = false,
  icon,
}: ButtonProps) => (
  <ButtonContainer
    onClick={(e: any) => onClick(e)}
    type={type}
    disabled={disabled}
  >
    {icon}
    {value}
  </ButtonContainer>
);

export default Button;
