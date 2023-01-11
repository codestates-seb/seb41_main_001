import styled from 'styled-components';
import { string } from 'yargs';

const ButtonContainer = styled.button`
  width: 200px;
  text-decoration: none;
  background-color: var(--gray);
  color: white;
  border-radius: 5px;
  margin: 5px;
  padding: 8px 14px;
  transition: 0.2s ease-in-out;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    background-color: var(--neon-yellow);
    color: black;
    transition: 0.2s ease-in-out;
  }
`;

interface propsType {
  name: string;
}

const Button = ({ name }: propsType) => {
  return <ButtonContainer>{name}</ButtonContainer>;
};
export default Button;
