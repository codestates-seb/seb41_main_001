import styled from 'styled-components';

const TagContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
  width: 140px;
  margin: 5px;
  padding: 5px;

  input {
    zoom: 0.5;
  }

  label {
    width: 110px;
    height: 20px;
    font-size: 13px;
  }
`;

interface PropsType {
  name: string;
  emoji: string;
}

const Tag = ({ name, emoji }: PropsType) => (
  <TagContainer>
    <input type="checkbox" id={name} name="tags" value={name} />
    <label htmlFor={name}>
      {name}
      {emoji}
    </label>
  </TagContainer>
);
export default Tag;
